/**
 * Sample React Native App for BlinkID
 * https://github.com/BlinkID/blinkid-react-native
 */

 /**
* Use these recognizer types
* Available:
* RECOGNIZER_USDL - scans barcodes located on the back of US driver license
* RECOGNIZER_MRTD - scans Machine Readable Travel Document, contained in various IDs and passports
* RECOGNIZER_EUDL - scans the front of European driver license
* RECOGNIZER_MYKAD - scans the front of Malaysian ID
* RECOGNIZER_NZDL_FRONT - scans the front side of New Zealand DL
* RECOGNIZER_DOCUMENT_FACE - scans documents with face image and returns document images
* RECOGNIZER_PDF417 - scans PDF417 type of barcode
*/

/**
 * There are several options you need to pass to scan function to add recognizers and to obtain the image and results
 * available:
 * enableBeep : if it is set to true, successful scan will play a sound
 * useFrontCamera : if it is set to false, back camera is used, else front
 * shouldReturnDocumentImage : if true, cropped document images in the recognition process will be returned
 * shouldReturnFaceImage : if true, cropped face images in the recognition process will be returned
 * shouldReturnSuccessfulImage : if true, image on which scan gave valid scanning result will be returned
 * recognizers : array which contains recognizers that will be activated
 */

/**
 * Scan method returns scan fields in JSON format and image(s) (image is returned as Base64 encoded JPEG)
 * scanningResult.resultImageSuccessful : full image on which scan gave valid scanning result
 * scanningResult.resultList : array of scanning results in JSON format (each activated recognizer can produce its own result)
 * scanningResult.resultList[i].resultImageDocument : cropped document image
 * scanningResult.resultList[i].resultImageFace : cropped face image
 */


import React, { Component } from 'react';
import {BlinkID, MRTDKeys, USDLKeys, EUDLKeys, MYKADKeys, PDF417Keys, NZDLFrontKeys} from 'blinkid-react-native';
import {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button
} from 'react-native';

const licenseKey = Platform.select({
      // iOS license key for applicationID: org.reactjs.native.example.BlinkIDReactNative
      ios: 'JGB6SUY2-MH7ZOUKB-L7UA7GP5-L3TYCFZQ-I3XGO774-UL225CKU-EOYRYXVH-ZCEPUZN4',
      // android license key for applicationID: com.blinkidreactnative
      android: 'JMXSJB6V-B3JBFNNF-DJWHC444-YZDHLI2P-P6XYVQNJ-TCWNIMXP-5U4F5RZY-L3DU6TK3'
})

var renderIf = function(condition, content) {
  if (condition) {
      return content;
  } 
  return null;
}

export default class BlinkIDReactNative extends Component {
  constructor(props) {
    super(props);
    this.state = {showImageDocument: false,
                  resultImageDocument: '',
                  showImageFace: false,
                  resultImageFace: '',
                  results: '',
                  licenseKeyErrorMessage: ''};
  }
  async scan() {
    try {
      const scanningResult = await BlinkID.scan(
      licenseKey,
      {
        enableBeep: true,
        useFrontCamera: false,
        shouldReturnDocumentImage: true,
        shouldReturnSuccessfulImage: false,
        // Returns face image when BlinkID.RECOGNIZER_DOCUMENT_FACE is used
        shouldReturnFaceImage: true,
        recognizers: [
          // scans documents with face image and returns document images
          // BlinkID.RECOGNIZER_DOCUMENT_FACE,
          // scans documents with MRZ (Machine Readable Zone)
          BlinkID.RECOGNIZER_MRTD,
          // scans USDL (US Driver License)
          BlinkID.RECOGNIZER_USDL,
          // scans EUDL (EU Driver License)
          BlinkID.RECOGNIZER_EUDL,
          // scans MyKad (Malaysian ID)
          BlinkID.RECOGNIZER_MYKAD,
          // scans the front side of New Zealand DL
          BlinkID.RECOGNIZER_NZDL_FRONT,
          // scans PDF417 type of barcode
          BlinkID.RECOGNIZER_PDF417
        ]
      })
      if (scanningResult) {
        let resultList = scanningResult.resultList;
        let resultsFormattedText = "";
        let fieldDelim = ";\n";
        let shouldShowResultImageDocument = false;
        let shouldShowResultImageFace = false;
        let imageDocument = "";
        let imageFace = "";
        for (let i = 0; i < resultList.length; i++) {
          // Get individual resilt
          var recognizerResult = resultList[i];
          resultsFormattedText += "Result type: " + recognizerResult.resultType + fieldDelim;
          if (recognizerResult.resultType == "USDL result") {
              // handle USDL parsing resul
              var fields = recognizerResult.fields
              // USDLKeys are keys from keys/usdl_keys.js
              resultsFormattedText += /** Personal information */
                                     "USDL version: " + fields[USDLKeys.StandardVersionNumber] + fieldDelim +
                                     "Family name: " + fields[USDLKeys.CustomerFamilyName] + fieldDelim +
                                     "First name: " + fields[USDLKeys.CustomerFirstName] + fieldDelim +
                                     "Date of birth: " + fields[USDLKeys.DateOfBirth] + fieldDelim +
                                     "Sex: " + fields[USDLKeys.Sex] + fieldDelim +
                                     "Eye color: " + fields[USDLKeys.EyeColor] + fieldDelim +
                                     "Height: " + fields[USDLKeys.Height] + fieldDelim +
                                     "Street: " + fields[USDLKeys.AddressStreet] + fieldDelim +
                                     "City: " + fields[USDLKeys.AddressCity] + fieldDelim +
                                     "Jurisdiction: " + fields[USDLKeys.AddressJurisdictionCode] + fieldDelim +
                                     "Postal code: " + fields[USDLKeys.AddressPostalCode] + fieldDelim +
                                      /** License information */
                                      "Issue date: " + fields[USDLKeys.DocumentIssueDate] + fieldDelim +
                                      "Expiration date: " + fields[USDLKeys.DocumentExpirationDate] + fieldDelim +
                                      "Issuer ID: " + fields[USDLKeys.IssuerIdentificationNumber] + fieldDelim +
                                      "Jurisdiction version: " + fields[USDLKeys.JurisdictionVersionNumber] + fieldDelim +
                                      "Vehicle class: " + fields[USDLKeys.JurisdictionVehicleClass] + fieldDelim +
                                      "Restrictions: " + fields[USDLKeys.JurisdictionRestrictionCodes] + fieldDelim +
                                      "Endorsments: " + fields[USDLKeys.JurisdictionEndorsementCodes] + fieldDelim +
                                      "Customer ID: " + fields[USDLKeys.CustomerIdNumber] + fieldDelim;

          } else if (recognizerResult.resultType == "MRTD result") {
                      
              var fields = recognizerResult.fields
              // MRTDKeys are keys from keys/mrtd_keys.js
              resultsFormattedText += /** Personal information */
                                      "Family name: " + fields[MRTDKeys.PrimaryId] + fieldDelim +
                                      "First name: " + fields[MRTDKeys.SecondaryId] + fieldDelim +
                                      "Date of birth: " + fields[MRTDKeys.DateOfBirth] + fieldDelim +
                                      "Sex: " + fields[MRTDKeys.Sex] + fieldDelim +
                                      "Nationality: " + fields[MRTDKeys.Nationality] + fieldDelim +
                                      "Date of Expiry: " + fields[MRTDKeys.DateOfExpiry] + fieldDelim +
                                      "Document Code: " + fields[MRTDKeys.DocumentCode] + fieldDelim +
                                      "Document Number: " + fields[MRTDKeys.DocumentNumber] + fieldDelim +
                                      "Issuer: " + fields[MRTDKeys.Issuer] + fieldDelim +
                                      "Opt1: " + fields[MRTDKeys.Opt1] + fieldDelim +
                                      "Opt2: " + fields[MRTDKeys.Opt2] + fieldDelim;

          } else if (recognizerResult.resultType == "EUDL result") {
                          
              var fields = recognizerResult.fields
              // EUDLKeys are keys from keys/eudl_keys.js
              resultsFormattedText += /** Personal information */
                                      "First name: " + fields[EUDLKeys.FirstName] + fieldDelim +
                                      "Last name: " + fields[EUDLKeys.LastName] + fieldDelim +
                                      "Date of Expiry: " + fields[EUDLKeys.ExpiryDate] + fieldDelim +
                                      "Issue Date: " + fields[EUDLKeys.IssueDate] + fieldDelim +
                                      "Driver Number: " + fields[EUDLKeys.DriverNumber] + fieldDelim +
                                      "Address: " + fields[EUDLKeys.Address] + fieldDelim +
                                      "Birth Data: " + fields[EUDLKeys.BirthData] + fieldDelim;

          } else if (recognizerResult.resultType == "MyKad result") {
    
              var fields = recognizerResult.fields
              // MYKADKeys are keys from keys/mykad_keys.js
              resultsFormattedText += /** Personal information */
                                      "Full name: " + fields[MYKADKeys.FullName] + fieldDelim +
                                      "NRIC Number: " + fields[MYKADKeys.NricNumber] + fieldDelim +
                                      "Address: " + fields[MYKADKeys.Address] + fieldDelim +
                                      "City: " + fields[MYKADKeys.AddressCity] + fieldDelim +
                                      "State: " + fields[MYKADKeys.AddressState] + fieldDelim +
                                      "Street: " + fields[MYKADKeys.AddressStreet] + fieldDelim +
                                      "Zip code: " + fields[MYKADKeys.AddressZipCode] + fieldDelim +
                                      "Date of birth: " + fields[MYKADKeys.DateOfBirth] + fieldDelim +
                                      "Religion: " + fields[MYKADKeys.Religion] + fieldDelim +
                                      "Sex: " + fields[MYKADKeys.Sex] + fieldDelim;

          } else if (recognizerResult.resultType == "NZDLFront result") {
    
              var fields = recognizerResult.fields
              // NZDLFrontKeys are keys from keys/nzdl_front_keys.js
              resultsFormattedText += /** Personal information */
                                      "First names: " + fields[NZDLFrontKeys.FirstNames] + fieldDelim +
                                      "Surname: " + fields[NZDLFrontKeys.Surname] + fieldDelim +
                                      "Date of birth: " + fields[NZDLFrontKeys.DateOfBirth] + fieldDelim +
                                      "Address: " + fields[NZDLFrontKeys.Address] + fieldDelim +
                                      "Date of expiry: " + fields[NZDLFrontKeys.ExpiryDate] + fieldDelim +
                                      "Date of issue: " + fields[NZDLFrontKeys.IssueDate] + fieldDelim +
                                      "License number: " + fields[NZDLFrontKeys.LicenseNumber] + fieldDelim +
                                      "Card version: " + fields[NZDLFrontKeys.CardVersion] + fieldDelim +
                                      "Donor indicator: " + fields[NZDLFrontKeys.DonorIndicator] + fieldDelim;
                                      

          } else if (recognizerResult.resultType == "PDF417 result") {

            var fields = recognizerResult.fields
            // PDF417Keys are keys from keys/pdf417_keys.js
            resultsFormattedText += "Barcode data: " + fields[PDF417Keys.BarcodeData] + fieldDelim;

          } else if (recognizerResult.resultType == "DocumentFace result") {
            // document face recognizer returns only images
          }
          resultsFormattedText += '\n';

          if (recognizerResult.resultImageDocument) {
            shouldShowResultImageDocument = true;
            imageDocument = 'data:image/jpg;base64,' + recognizerResult.resultImageDocument.base64;
          }
          if (recognizerResult.resultImageFace) {
            shouldShowResultImageFace = true;
            imageFace = 'data:image/jpg;base64,' + recognizerResult.resultImageFace.base64;
          }

        }
        // image is returned as base64 encoded JPEG, we expect resultImageDocument and resultImageFace because we have activated obtaining of document and face images (shouldReturnDocumentImage: true, shouldReturnFaceImage: true)
        // to obtain image from successful scan, activate option (shouldReturnSuccessfulImage: true) and get is with scanningResult.resultImageSuccessful
        this.setState({showImageDocument: shouldShowResultImageDocument, resultImageDocument: imageDocument,
                       showImageFace: shouldShowResultImageFace, resultImageFace: imageFace, results: resultsFormattedText});
      }
    } catch(error) {
        this.setState({ showImageDocument: false, resultImageDocument: '', showImageFace: false, resultImageFace: '', results: error.message});
    }
    
  }

  render() {
    let displayImageDocument = this.state.resultImageDocument;
    let displayImageFace = this.state.resultImageFace;
    let displayFields = this.state.results;
    let licenseKeyErrorMessage = this.state.licenseKeyErrorMessage;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>MicroBlink Ltd</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.scan.bind(this)}
            title="Scan"
            color="#87c540"
          />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}y> 
          {renderIf(this.state.showImageDocument,
              <View style={styles.imageContainer}>
              <Image
                resizeMode='contain'
                source={{uri: displayImageDocument, scale: 3}} style={styles.imageResult}/>
              </View>
          )}
          {renderIf(this.state.showImageFace,
              <View style={styles.imageContainer}>
              <Image
                resizeMode='contain'
                source={{uri: displayImageFace, scale: 3}} style={styles.imageResult}/>
              </View>
          )}
          <Text style={styles.results}>{displayFields}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  label: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50
  },
  buttonContainer: {
    margin: 20
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  results: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imageResult: {
    flex: 1,
    flexShrink: 1,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
  },
});

AppRegistry.registerComponent('BlinkIDReactNative', () => BlinkIDReactNative);
