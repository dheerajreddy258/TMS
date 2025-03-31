package com.example.tms.dao;

import com.example.tms.entity.Task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {
	List<Task> findByUserId(Long userId);
}