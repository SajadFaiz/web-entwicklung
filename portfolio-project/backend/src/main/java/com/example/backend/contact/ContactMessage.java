package com.example.backend.contact;

import jakarta.persistence.*;

import java.time.OffsetDateTime;

@Entity
@Table(name = "contact_messages")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 200)
    private String email;

    @Column(nullable = false, length = 150)
    private String subject;

    @Column(nullable = false, length = 3000)
    private String message;

    @Column(name = "submitted_at", nullable = false)
    private OffsetDateTime submittedAt;

    protected ContactMessage() {
    }

    public ContactMessage(
            String name,
            String email,
            String subject,
            String message,
            OffsetDateTime submittedAt
    ) {
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.submittedAt = submittedAt;
    }

    public Long getId() {
        return id;
    }

    public OffsetDateTime getSubmittedAt() {
        return submittedAt;
    }
}