package com.example.Database.Repository;


import com.example.Database.Models.Category;
import com.example.Database.Models.Question;
import com.example.Database.Models.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByCategory(Category category);
    List<Question> findByStartupId(Long startupId);
    List<Question> findByTags(Tag tag);
    List<Question> findByCategoryAndTagsContaining(Category category, Tag tag);
}
