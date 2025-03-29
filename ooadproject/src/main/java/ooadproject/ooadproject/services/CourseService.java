package ooadproject.ooadproject.services;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import ooadproject.ooadproject.models.Courses;
import ooadproject.ooadproject.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<Courses> getAllCourses() {
        return courseRepository.findAll();
    }

    public Courses getCourseById(String id) {
        return courseRepository.findById(id).orElse(null);
    }

    
}
