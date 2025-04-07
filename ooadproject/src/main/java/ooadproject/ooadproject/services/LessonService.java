package ooadproject.ooadproject.services;

import ooadproject.ooadproject.models.Lessons;
import ooadproject.ooadproject.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.bson.types.ObjectId;
import java.util.List;

@Service
public class LessonService {

    @Autowired
    private LessonRepository lessonRepository;

    public Lessons getLessonById(String id) {
        return lessonRepository.findById(id).orElse(null);
    }

    public List<Lessons> getLessonByCourseId(String courseId) {
        return lessonRepository.findByCourseIdString(new ObjectId(courseId));
    }
    
    public List<Lessons> getAllLessons() {
        return lessonRepository.findAll();
    }

    public String createLesson(Lessons lesson) {
        return lessonRepository.save(lesson).getId();
        
    }
}
