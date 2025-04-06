package ooadproject.ooadproject.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ooadproject.ooadproject.models.LessonProgress;
import ooadproject.ooadproject.repository.LessonProgressRepository;

import java.util.List;

@Service
public class LessonProgressService {
    @Autowired
    private LessonProgressRepository lessonProgressRepository;

    public LessonProgress save(LessonProgress lessonProgress) {
        return lessonProgressRepository.save(lessonProgress);
    }

    public LessonProgress findByUserIdAndLessonId(ObjectId userId, ObjectId lessonId) {
        return lessonProgressRepository.findByUserIdAndLessonId(userId, lessonId);
    }

    public List<LessonProgress> findByUserId(ObjectId userId) {
        return lessonProgressRepository.findByUserId(userId);
    }

    public List<LessonProgress> findByUserIdAndCourseId(ObjectId userId, ObjectId courseId) {
        return lessonProgressRepository.findByUserIdAndCourseId(userId, courseId);
    }

    public LessonProgress markLessonAsComplete(ObjectId userId, ObjectId courseId, ObjectId lessonId) {
        // Check if a progress record already exists
        LessonProgress progress = findByUserIdAndLessonId(userId, lessonId);
        
        if (progress == null) {
            // Create a new progress record
            progress = new LessonProgress(userId, courseId, lessonId, true);
        } else {
            // Update existing record to mark as completed
            progress.setIsCompleted(true);
        }
        
        return save(progress);
    }
} 