import { Recognizer, RecognizerResult } from '../recognizer'
import {
    Date, 
    Point, 
    Quadrilateral,
    MrtdDocumentType, 
    MrzResult, 
    EudlCountry, 
    DocumentFaceDetectorType,
    ImageExtensionFactors,
} from '../types'

/**
 * Result object for BlinkIdCombinedRecognizer.
 */
export class BlinkIdCombinedRecognizerResult extends RecognizerResult {
    constructor(nativeResult) {
        super(nativeResult.resultState);
        
        /** 
         * The address of the document owner. 
         */
        this.address = nativeResult.address;
        
        /** 
         * The date of birth of the document owner. 
         */
        this.dateOfBirth = nativeResult.dateOfBirth != null ? new Date(nativeResult.dateOfBirth) : null;
        
        /** 
         * The date of expiry of the document. 
         */
        this.dateOfExpiry = nativeResult.dateOfExpiry != null ? new Date(nativeResult.dateOfExpiry) : null;
        
        /** 
         * The date of issue of the document. 
         */
        this.dateOfIssue = nativeResult.dateOfIssue != null ? new Date(nativeResult.dateOfIssue) : null;
        
        /** 
         * Defines digital signature of recognition results. 
         */
        this.digitalSignature = nativeResult.digitalSignature;
        
        /** 
         * Defines digital signature version. 
         */
        this.digitalSignatureVersion = nativeResult.digitalSignatureVersion;
        
        /** 
         * Defines {true} if data from scanned parts/sides of the document match, 
         */
        this.documentDataMatch = nativeResult.documentDataMatch;
        
        /** 
         * The document number. 
         */
        this.documentNumber = nativeResult.documentNumber;
        
        /** 
         * The driver license detailed info. 
         */
        this.driverLicenseDetailedInfo = nativeResult.driverLicenseDetailedInfo;
        
        /** 
         * Face image from the document 
         */
        this.faceImage = nativeResult.faceImage;
        
        /** 
         * The first name of the document owner. 
         */
        this.firstName = nativeResult.firstName;
        
        /** 
         * Image of the full document 
         */
        this.fullDocumentImage = nativeResult.fullDocumentImage;
        
        /** 
         * The full name of the document owner. 
         */
        this.fullName = nativeResult.fullName;
        
        /** 
         * The last name of the document owner. 
         */
        this.lastName = nativeResult.lastName;
        
        /** 
         * {true} if recognizer has finished scanning first side and is now scanning back side, 
         */
        this.scanningFirstSideDone = nativeResult.scanningFirstSideDone;
        
        /** 
         * The sex of the document owner. 
         */
        this.sex = nativeResult.sex;
        
    }
}

/**
 * A generic recognizer which can scan front and back side of the document.
 */
export class BlinkIdCombinedRecognizer extends Recognizer {
    constructor() {
        super('BlinkIdCombinedRecognizer');
        
        /** 
         * The DPI (Dots Per Inch) for face image that should be returned. 
         */
        this.faceImageDpi = 250;
        
        /** 
         * The DPI (Dots Per Inch) for full document image that should be returned. 
         */
        this.fullDocumentImageDpi = 250;
        
        /** 
         * The extension factors for full document image. 
         */
        this.fullDocumentImageExtensionFactors = new ImageExtensionFactors();
        
        /** 
         * Defines whether face image will be available in result. 
         */
        this.returnFaceImage = false;
        
        /** 
         * Defines whether full document image will be available in 
         */
        this.returnFullDocumentImage = false;
        
        /** 
         * Defines whether or not recognition result should be signed. 
         */
        this.signResult = false;
        
        this.createResultFromNative = function (nativeResult) { return new BlinkIdCombinedRecognizerResult(nativeResult); }
    }
}