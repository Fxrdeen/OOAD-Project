package ooadproject.ooadproject.controllers;

import ooadproject.ooadproject.models.Lessons;
import ooadproject.ooadproject.services.LessonService;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @GetMapping("/{id}")
    public Lessons getLessonById(@PathVariable String id) {
        return lessonService.getLessonById(id);
    }
    
    @GetMapping("/course/{courseId}")
    public List<Lessons> getLessonByCourseId(@PathVariable String courseId) {
        return lessonService.getLessonByCourseId(courseId);
    }

    @PostMapping("/create")
    public String createLesson(@RequestBody Lessons lesson) {
        return lessonService.createLesson(lesson);
    }
}
