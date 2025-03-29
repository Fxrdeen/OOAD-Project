package ooadproject.ooadproject.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import ooadproject.ooadproject.models.Courses;
import ooadproject.ooadproject.services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/courses")
public class CoursesController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<Courses> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping("/{id}")
    public Courses getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id);
    }

    
    

}