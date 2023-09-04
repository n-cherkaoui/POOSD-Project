<?php
	$inData = getRequestInfo();
	
	$userId = $inData["userId"];
	
	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
	if ($conn->connect_error) {
		returnWithError( $conn->connect_error );
	} 
	else {	
		$stmt = $conn->prepare("SELECT * FROM COP4331.Contacts Where UserId = ?;");
		$stmt->bind_param("i", $userId);
		$stmt->execute();
		$result = $stmt->get_result();

		if ($result->num_rows > 0) {
            $result_array = array();
            while ($row = $result->fetch_assoc()){
                $resultsArray[] = $row;
            }
        
            echo json_encode($resultsArray);
        }
        else {
            returnWithError("No Records Found");
        }

		$stmt->close();
        $conn->close();
	}

	function getRequestInfo() {
		return json_decode(file_get_contents('php://input'), true);
	}

?>