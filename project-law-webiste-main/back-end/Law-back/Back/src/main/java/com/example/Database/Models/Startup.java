package com.example.Database.Models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Startups")
public class Startup extends User {

    @Column(name = "Company_Name", nullable = false, length = 100)
    private String companyName;

    @Column(name = "Description", length = 255)
    private String description;

    @OneToMany(mappedBy = "startup", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Startup{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", companyName='" + companyName + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
