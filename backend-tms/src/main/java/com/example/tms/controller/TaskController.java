package com.example.tms.controller;

import com.example.tms.dao.RegisterRepo;
import com.example.tms.dao.TaskRepo;
import com.example.tms.entity.Register;
import com.example.tms.entity.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/tms/tasks")
public class TaskController {

    @Autowired
    private TaskRepo taskRepo;
    @Autowired
    private RegisterRepo repo;

    // Create Task
//    @PostMapping("/create")
//    public Task createTask(@RequestBody Task task) {
//        return taskRepo.save(task);
//    }
    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody Task task, @RequestParam Long userId) {
        Register user = repo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        task.setUser(user);
        taskRepo.save(task);
        return ResponseEntity.ok(Map.of("message", "Task created successfully!"));
    }


    // Get All Tasks
//    @GetMapping("/all")
//    public List<Task> getAllTasks() {
//        return taskRepo.findAll();
//    }
//
//    // Get Task by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
//        Task task = taskRepo.findById(id).orElse(null);
//        return ResponseEntity.ok(task);
//    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Task>> getUserTasks(@PathVariable Long userId) {
        List<Task> tasks = taskRepo.findByUserId(userId);
        return ResponseEntity.ok(tasks);
    }


    // Update Task
//    @PutMapping("/update/{id}")
//    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
//        Task task = taskRepo.findById(id).orElse(null);
//        if (task != null) {
//            task.setTitle(taskDetails.getTitle());
//            task.setDescription(taskDetails.getDescription());
//            task.setDueDate(taskDetails.getDueDate());
//            task.setStatus(taskDetails.getStatus());
//            task.setPriority(taskDetails.getPriority());
//            return ResponseEntity.ok(taskRepo.save(task));
//        }
//        return ResponseEntity.notFound().build();
//    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task updatedTask, @RequestParam Long userId) {
        Task task = taskRepo.findById(id).orElse(null);
        
        if (task == null || !task.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Task not found or does not belong to user!");
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setDueDate(updatedTask.getDueDate());
        task.setStatus(updatedTask.getStatus());
        task.setPriority(updatedTask.getPriority());
        
        return ResponseEntity.ok(taskRepo.save(task));
    }


    // Delete Task
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
//        taskRepo.deleteById(id);
//        return ResponseEntity.ok("Task deleted successfully!");
//    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @RequestParam Long userId) {
        Task task = taskRepo.findById(id).orElse(null);

        if (task == null || !task.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Task not found or does not belong to user!");
        }

        taskRepo.deleteById(id);
        return ResponseEntity.ok("Task deleted successfully!");
    }

}
