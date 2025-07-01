package com.example.Database.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "Lawyers")
public class Lawyer extends User {

    @Column(name = "Specialization", length = 100)
    private String specialization;

    @Column(name = "Experience_Years")
    private int experienceYears;

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public int getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(int experienceYears) {
        this.experienceYears = experienceYears;
    }

    @Override
    public String toString() {
        return "Lawyer{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", specialization='" + specialization + '\'' +
                ", experienceYears=" + experienceYears +
                '}';
    }
}
