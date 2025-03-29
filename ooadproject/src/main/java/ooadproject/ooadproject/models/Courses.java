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
    private String difficulty;
    private Integer hours;
    private Integer lessons;
    private String price;
    private Integer rating; 
    // Default constructor
    public Courses() {
    }

    // Constructor with all fields
    public Courses(String id, String title, String description, String instructorId, String difficulty, Integer hours, Integer lessons, String price, Integer rating) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructorId = instructorId;
        this.difficulty = difficulty;
        this.hours = hours;
        this.lessons = lessons;
        this.price = price;
        this.rating = rating;
    }

    // Constructor without id (for new courses)
    public Courses(String title, String description, String instructorId, String difficulty, Integer hours, Integer lessons, String price, Integer rating   ) {
        this.title = title;
        this.description = description;
        this.instructorId = instructorId;
        this.difficulty = difficulty;
        this.hours = hours;
        this.lessons = lessons;
        this.price = price;
        this.rating = rating;
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
    
    public String getDifficulty() {
        return difficulty;
    }
    
    public Integer getHours() {
        return hours;
    }
    
    public Integer getLessons() {
        return lessons;
    }
    
    public String getPrice() {
        return price;
    }
    
    public Integer getRating() {
        return rating;
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

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
    
    public void setHours(Integer hours) {
        this.hours = hours;
    }
    
    public void setLessons(Integer lessons) {
        this.lessons = lessons;
    }
    
    public void setPrice(String price) {
        this.price = price;
    }
    
    public void setRating(Integer rating) {
        this.rating = rating;
    }
        
}
