package com.example.Database.Controller;

import com.example.Database.Models.Category;
import com.example.Database.Models.Question;
import com.example.Database.Models.Startup;
import com.example.Database.Models.Tag;
import com.example.Database.Repository.StartupRepository;
import com.example.Database.Service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private StartupRepository startupRepository;

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestionById(@PathVariable Long id) {
        Question question = questionService.getQuestionById(id);
        if (question != null) {
            return new ResponseEntity<>(question, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<List<Question>> getAllQuestions() {
        List<Question> questions = questionService.getAllQuestions();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/filter")
    public List<Question> getByCategoryAndTag(
            @RequestParam(required = false) Category category,
            @RequestParam(required = false) Tag tag) {

        if (category != null && tag != null) {
            return questionService.getQuestionsByCategoryAndTags(category, tag);
        } else if (category != null) {
            return questionService.getQuestionsByCategory(category);
        } else if (tag != null) {
            return questionService.getQuestionsByTags(tag);
        } else {
            return questionService.getAllQuestions();
        }
    }

    @GetMapping("/startup/{startupId}")
    public ResponseEntity<List<Question>> getQuestionsByStartup(@PathVariable Long startupId) {
        List<Question> questions = questionService.getQuestionsByStartup(startupId);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestBody Question question,
                                                   @RequestParam Long startupId) {
        Optional<Startup> startupOpt = startupRepository.findById(startupId);
        if (startupOpt.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        System.out.println(startupOpt);
        question.setStartup(startupOpt.get());
        question.setCreatedAt(new Date());

        Question createdQuestion = questionService.createQuestion(question);
        return new ResponseEntity<>(createdQuestion, HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updatedQuestion) {
        Question updated = questionService.updateQuestion(id, updatedQuestion);
        if (updated != null) {
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
