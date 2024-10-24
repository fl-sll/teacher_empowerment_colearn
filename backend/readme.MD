# Backend Asset Management

## Project Setup
### 1. Create a Virtual Environment:
```
python -m venv BEenv
```

### 2. Activate venv
Mac:
```
source BEenv/bin/activate
```

Windows:
```
BEenv/Scripts/activate
```

### 3. Download Requirements
```
pip install -r requirements.txt
```

## How to run
### 1. Navigate to the project directory
```
cd <project_directory>/backend
```

### 2. Run using uvicorn
```
uvicorn main:app --reload
```