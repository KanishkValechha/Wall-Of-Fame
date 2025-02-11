from pymongo import MongoClient
import base64
from bson.binary import Binary
from bson.objectid import ObjectId
import os
from datetime import datetime

def connect_to_mongodb():
    # Connect to MongoDB (adjust the connection string as needed)
    client = MongoClient('mongodb+srv://admin:pass@cluster0.fg4je.mongodb.net/')
    db = client['Wall-Of-Fame']
    return db.achievers

def read_file(file_path):
    with open(file_path, 'rb') as file:
        return Binary(file.read())

def upload_achievement(collection):
    try:
        # Get file paths from user
        user_image_path = input("Enter path to user image (e.g., C:/Users/YourName/image.jpg): ").strip('"')
        certificate_path = input("Enter path to certificate (e.g., C:/Users/YourName/cert.pdf): ").strip('"')

        # Read files
        user_image_data = read_file(user_image_path)
        certificate_data = read_file(certificate_path)

        # Get file types (you might want to add more robust file type detection)
        user_image_type = 'image/jpeg' if user_image_path.lower().endswith(('.jpg', '.jpeg')) else 'image/png'
        certificate_type = 'application/pdf' if certificate_path.lower().endswith('.pdf') else 'image/jpeg'

        # Create achievement document
        achievement = {
            "fullName": input("Enter full name: "),
            "registrationNumber": input("Enter registration number: "),
            "mobileNumber": input("Enter mobile number: "),
            "achievementCategory": input("Enter achievement category\n(Academic Excellence, Research Achievements, Professional Achievements,\nLeadership & Service, Sports & Athletics, Innovation & Technology): "),
            "professorName": input("Enter professor name: "),
            "professorEmail": input("Enter professor email: "),
            "userImage": {
                "data": user_image_data,
                "contentType": user_image_type
            },
            "certificateProof": {
                "data": certificate_data,
                "contentType": certificate_type
            },
            "submissionDate": datetime.now(),
            "approved":None
        }

        # Insert into MongoDB
        result = collection.insert_one(achievement)
        print(f"\nSuccess! Document inserted with ID: {result.inserted_id}")
        
        return result.inserted_id

    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return None

def verify_upload(collection, document_id):
    # Verify the upload by retrieving the document
    doc = collection.find_one({"_id": document_id})
    if doc:
        print("\nVerification successful! Document details:")
        print(f"Name: {doc['fullName']}")
        print(f"Registration Number: {doc['registrationNumber']}")
        print(f"Achievement Category: {doc['achievementCategory']}")
        print(f"User Image Type: {doc['userImage']['contentType']}")
        print(f"Certificate Type: {doc['certificateProof']['contentType']}")
    else:
        print("Verification failed: Document not found")

def download_files(collection, document_id, output_directory):
    """
    Download user image and certificate files from MongoDB document
    
    Parameters:
    collection: MongoDB collection object
    document_id: String or ObjectId of the document
    output_directory: Directory where files will be saved
    
    Returns:
    tuple: (image_path, certificate_path) if successful, (None, None) if failed
    """
    try:
        # Convert string ID to ObjectId if necessary
        if isinstance(document_id, str):
            document_id = ObjectId(document_id)
            
        # Retrieve the document
        doc = collection.find_one({"_id": document_id})
        if not doc:
            print("Document not found!")
            return None, None
            
        # Create output directory if it doesn't exist
        os.makedirs(output_directory, exist_ok=True)
        
        # Generate file paths
        user_image_ext = '.jpg' if doc['userImage']['contentType'] == 'image/jpeg' else '.png'
        cert_ext = '.pdf' if doc['certificateProof']['contentType'] == 'application/pdf' else '.jpg'
        
        image_path = os.path.join(output_directory, f"{doc['registrationNumber']}_image{user_image_ext}")
        cert_path = os.path.join(output_directory, f"{doc['registrationNumber']}_certificate{cert_ext}")
        
        # Save user image
        with open(image_path, 'wb') as f:
            f.write(doc['userImage']['data'])
            
        # Save certificate
        with open(cert_path, 'wb') as f:
            f.write(doc['certificateProof']['data'])
            
        print(f"\nFiles downloaded successfully!")
        print(f"Image saved to: {image_path}")
        print(f"Certificate saved to: {cert_path}")
        
        return image_path, cert_path
        
    except Exception as e:
        print(f"An error occurred while downloading files: {str(e)}")
        return None, None


if __name__=='__main__':
    print("Connecting to MongoDB...")
    collection = connect_to_mongodb()
    download_files(collection,ObjectId('67a6fff19bd85c67bb66b900'),r"C:\Users\vedic\Downloads")
    exit()
    print("\n=== Achievement Upload System ===")
    doc_id = upload_achievement(collection)
    verify_upload(collection,doc_id)