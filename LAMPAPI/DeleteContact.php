<?php
	$inData = getRequestInfo();
	
	$id = $inData["id"];
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error );
	} 
	else {	
		$stmt = $conn->prepare("DELETE FROM COP4331.Contacts Where id = ?;");
		$stmt->bind_param("i", $id);

		if ($stmt->execute()) {
            echo "Contact deleted successfully!";
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults ) {
		$retValue = '{"results":[' . $searchResults . '],"error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>