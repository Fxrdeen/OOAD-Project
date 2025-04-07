package ooadproject.ooadproject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ooadproject.ooadproject.models.Enroll;
import ooadproject.ooadproject.services.EnrollService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/enroll")
public class EnrollController {
    @Autowired
    private EnrollService enrollService;

    @PostMapping("/{userId}/{courseId}")
    public ResponseEntity<?> enrollUserInCourse(@PathVariable String userId, @PathVariable String courseId) {
        try {
            // Check if the user is already enrolled in this course
            Enroll existingEnroll = enrollService.findByUserIdAndCourseId(userId, courseId);
            
            if (existingEnroll != null) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("User is already enrolled in this course");
            }
            
            // Create a new enrollment
            Enroll enroll = new Enroll(userId, courseId);
            Enroll savedEnroll = enrollService.save(enroll);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(savedEnroll);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Failed to enroll: " + e.getMessage());
        }
    }
    
    @GetMapping("/{userId}/{courseId}")
    public ResponseEntity<?> checkEnrollment(@PathVariable String userId, @PathVariable String courseId) {
        try {
            Enroll enroll = enrollService.findByUserIdAndCourseId(userId, courseId);
            
            if (enroll == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enrollment not found");
            }
            
            return ResponseEntity.ok(enroll);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error checking enrollment: " + e.getMessage());
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserEnrollments(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(enrollService.findByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error fetching user enrollments: " + e.getMessage());
        }
    }

    @GetMapping("/students/{courseId}")
    public ResponseEntity<?> getStudentsByCourseId(@PathVariable String courseId) {
        return ResponseEntity.ok(enrollService.findAllStudentsByCourseId(courseId));
    }
}