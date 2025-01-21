<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <title>Document</title>
    <style>
        /* Custom background color */
        body {
            background-color: #f0f8ff; /* Light blue color */
            height: 100vh; /* Ensure full viewport height */
        }
        .container {
            text-align: center; /* Center the content */
            width: 100%;
        }
    </style>
</head>
<body class="d-flex justify-content-center align-items-center">
    <div class="container">
        <h1>Chat Bot</h1>
        <input type="text" placeholder="Start chat" id="text" class="form-control mb-3">
        <button onClick="generateResponse()" class="btn btn-primary mb-3">Generate Response</button>
        <div id="response" class="mt-3"></div>
    </div>

    <script src="script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>
