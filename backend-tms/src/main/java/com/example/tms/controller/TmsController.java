package com.example.tms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tms.dao.RegisterRepo;
import com.example.tms.entity.Register;


@CrossOrigin("*")
@RestController
@RequestMapping("/tms")
public class TmsController {
	@Autowired
	private RegisterRepo repo;
	
	@GetMapping("/")
	public List<Register> details()
	{
		return repo.findAll();
	}
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> registerUser(@RequestBody Register registration) {
	    repo.save(registration);

	    // Creating a JSON response
	    Map<String, String> response = new HashMap<>();
	    response.put("message", "Registration Successful!");
	    
	    return ResponseEntity.ok(response);
	}
	
//	@PostMapping("/login")
//	public ResponseEntity<Map<String, String>> loginUser(@RequestBody Register loginRequest) {
//		Map<String, String> response = new HashMap<>();
//
//	    if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
//	        response.put("message", "Username or Password is missing");
//	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
//	    }
//
//	    Register user = repo.findByEmail(loginRequest.getEmail());
//
//	    if (user == null) {
//	        response.put("message", "User not found");
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//	    }
//
//	    if (!user.getPassword().equals(loginRequest.getPassword())) {
//	        response.put("message", "Incorrect password");
//	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
//	    }
//
//	    response.put("message", "Login Successful!");
//	    return ResponseEntity.ok(response);
//	}
	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Register loginRequest) {
	    Map<String, Object> response = new HashMap<>();

	    if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
	        response.put("message", "Username or Password is missing");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }

	    Register user = repo.findByEmail(loginRequest.getEmail());

	    if (user == null) {
	        response.put("message", "User not found");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	    }

	    if (!user.getPassword().equals(loginRequest.getPassword())) {
	        response.put("message", "Incorrect password");
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
	    }

	    // Successful login - include user ID in response
	    response.put("message", "Login Successful!");
	    response.put("userId", user.getId()); // Assuming Register entity has getId()
	    response.put("email", user.getEmail());
	    
	    // For now we'll just return a dummy token
	    // In production, you should implement proper JWT token generation
	    response.put("token", "dummy-token-" + System.currentTimeMillis());
	    
	    return ResponseEntity.ok(response);
	}
}
