package ooadproject.ooadproject.controllers;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import ooadproject.ooadproject.models.LessonProgress;
import ooadproject.ooadproject.services.LessonProgressService;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/lesson-progress")
public class LessonProgressController {

    @Autowired
    private LessonProgressService lessonProgressService;

    @PostMapping("/complete/{userId}/{courseId}/{lessonId}")
    public ResponseEntity<?> markLessonComplete(
            @PathVariable String userId,
            @PathVariable String courseId,
            @PathVariable String lessonId) {
        try {
            ObjectId userObjId = new ObjectId(userId);
            ObjectId courseObjId = new ObjectId(courseId);
            ObjectId lessonObjId = new ObjectId(lessonId);
            
            LessonProgress progress = lessonProgressService.markLessonAsComplete(userObjId, courseObjId, lessonObjId);
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error marking lesson as complete: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/{courseId}")
    public ResponseEntity<?> getUserCourseProgress(
            @PathVariable String userId,
            @PathVariable String courseId) {
        try {
            ObjectId userObjId = new ObjectId(userId);
            ObjectId courseObjId = new ObjectId(courseId);
            
            List<LessonProgress> progressList = 
                lessonProgressService.findByUserIdAndCourseId(userObjId, courseObjId);
            
            return ResponseEntity.ok(progressList);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error fetching user's course progress: " + e.getMessage());
        }
    }

    @GetMapping("/{userId}/{courseId}/{lessonId}")
    public ResponseEntity<?> checkLessonProgress(
            @PathVariable String userId,
            @PathVariable String courseId,
            @PathVariable String lessonId) {
        try {
            ObjectId userObjId = new ObjectId(userId);
            ObjectId lessonObjId = new ObjectId(lessonId);
            
            LessonProgress progress = 
                lessonProgressService.findByUserIdAndLessonId(userObjId, lessonObjId);
            
            if (progress == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No progress found");
            }
            
            return ResponseEntity.ok(progress);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error checking lesson progress: " + e.getMessage());
        }
    }
} 