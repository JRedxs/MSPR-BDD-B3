from cryptography.fernet import Fernet

class Encryption:
    def __init__(self):
        self.key = Fernet.generate_key()
        self.fernet = Fernet(self.key)

    def encrypt(self, message):
        if isinstance(message, str):
            message = message.encode()
        if not isinstance(message, bytes):
            raise TypeError("data must be bytes")
        encrypted_message = self.fernet.encrypt(message)
        return encrypted_message

    def decrypt(self, encrypted_message):
        decrypted_message = self.fernet.decrypt(encrypted_message)
        return decrypted_message
    
    