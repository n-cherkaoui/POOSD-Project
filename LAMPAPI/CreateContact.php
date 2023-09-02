<?php
	$inData = getRequestInfo();
    
	$userId = $inData["userId"];
	$firstName = $inData["firstName"];
	$lastName = $inData["lastName"];
	$phone = $inData["phone"];
	$email = $inData["email"];

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error );
	} 
	else {
		$stmt = $conn->prepare("INSERT INTO Contacts (UserId, FirstName, LastName, Phone, Email) VALUES (?, ?, ?, ?, ?)");
		$stmt->bind_param("sssss", $userId, $firstName, $lastName, $phone, $email);
        if ($stmt->execute()) {
            echo "Contact added successfully!";
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

	function sendResultInfoAsJson( $obj ) {
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err ) {
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

?>