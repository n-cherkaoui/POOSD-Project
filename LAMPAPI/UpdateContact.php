<?php
	$inData = getRequestInfo();
  
  $id = $inData["id"];
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
		$stmt = $conn->prepare("UPDATE Contacts SET firstname = ?, lastname = ?, email = ?, phone = ?, userId = ? WHERE id = ?;");
		$stmt->bind_param("ssssii", $firstName, $lastName, $email, $phone, $userId, $id);
    if ($stmt->execute()) {
        echo "Contact updated successfully!";
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