package ooadproject.ooadproject.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ooadproject.ooadproject.services.QuizService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import ooadproject.ooadproject.models.Quiz;
import ooadproject.ooadproject.models.QuizResponse;

@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("{id}")
    public Quiz getQuizByCourseId(@PathVariable String id) {
        return quizService.getQuizByCourseId(id);
    }

    @PostMapping("/submit")
    public QuizResponse submitQuiz(@RequestBody QuizResponse quizResponse) {
        return quizService.submitQuiz(quizResponse);
    }
    @GetMapping("/response/{courseId}/{userId}")
    public ResponseEntity<?> getQuizResponseByCourseIdAndUserId(@PathVariable String courseId, @PathVariable String userId) {
        try {
            return ResponseEntity.ok(quizService.getQuizResponseByCourseIdAndUserId(courseId, userId));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Quiz response not found" + e.getMessage());
        }
    }
    @PostMapping("/add")
    public String addQuiz(@RequestBody Quiz quiz) {
        return quizService.addQuiz(quiz);
    }
    
    
}
