package com.example.Database.Service;

import com.example.Database.Models.Category;
import com.example.Database.Models.Question;
import com.example.Database.Models.Tag;
import com.example.Database.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question getQuestionById(Long id) {
        return questionRepository.findById(id).orElse(null);
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    public List<Question> getQuestionsByCategory(Category category) {
        return questionRepository.findByCategory(category);
    }

    public List<Question> getQuestionsByCategoryAndTags(Category category, Tag tag) {
        return questionRepository.findByCategoryAndTagsContaining(category, tag);
    }

    public List<Question> getQuestionsByTags(Tag tag) {
        return questionRepository.findByTags(tag);
    }

    public List<Question> getQuestionsByStartup(Long startupId) {
        return questionRepository.findByStartupId(startupId);
    }

    @Transactional
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Transactional
    public Question updateQuestion(Long id, Question updatedQuestion) {
        return questionRepository.findById(id).map(existingQuestion -> {
            existingQuestion.setTitle(updatedQuestion.getTitle());
            existingQuestion.setDescription(updatedQuestion.getDescription());

            if (updatedQuestion.getTags() != null && !updatedQuestion.getTags().isEmpty()) {
                existingQuestion.setTags(updatedQuestion.getTags());
            }

            if (updatedQuestion.getCategory() != null) {
                existingQuestion.setCategory(updatedQuestion.getCategory());
            }

            return questionRepository.save(existingQuestion);
        }).orElse(null);
    }

    @Transactional
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }
}
