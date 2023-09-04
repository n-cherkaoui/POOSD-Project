<?php
	$inData = getRequestInfo();
    
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$login = $inData["login"];
	$password = $inData["password"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error );
	} 
	else {
		$stmt = $conn->prepare("INSERT INTO Users (Login, Password, FirstName, LastName) VALUES (?, ?, ?, ?)");
		$stmt->bind_param("ssss", $login, $password, $firstName, $lastName);
        if ($stmt->execute()) {
            echo "User added successfully!";
        }
        else {
            echo "Error: " . $stmt->error;
        }
		
		$stmt->close();
		$conn->close();
	}

	function getRequestInfo() {
		return json_decode(file_get_contents('php://input'), true);
	}

?>