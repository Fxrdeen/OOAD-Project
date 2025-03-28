package ooadproject.ooadproject.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "courses")
public class Courses {
    @Id
    private String id;
    private String title;
    private String description;
    @Field("instructor_id")
    private String instructorId;

    // Default constructor
    public Courses() {
    }

    // Constructor with all fields
    public Courses(String id, String title, String description, String instructorId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructorId = instructorId;
    }

    // Constructor without id (for new courses)
    public Courses(String title, String description, String instructorId) {
        this.title = title;
        this.description = description;
        this.instructorId = instructorId;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getInstructorId() {
        return instructorId;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setInstructorId(String instructorId) {
        this.instructorId = instructorId;
    }
}
