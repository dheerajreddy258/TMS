package com.example.tms.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tms.entity.Register;

public interface RegisterRepo extends JpaRepository<Register, Long> {

	Register findByEmail(String email);
	
}
