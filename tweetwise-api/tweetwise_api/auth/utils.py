import secrets
import string

def generate_api_key(length=32):
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))

# Generate a new API key
new_api_key = generate_api_key()
print(f"Your new API key is: {new_api_key}")