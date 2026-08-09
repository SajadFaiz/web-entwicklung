package com.example.backend.contact;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

@Service
@Transactional
public class ContactService {

    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    public ContactResponse create(ContactRequest request) {
        ContactMessage contactMessage = new ContactMessage(
                request.name().trim(),
                request.email().trim().toLowerCase(),
                request.subject().trim(),
                request.message().trim(),
                OffsetDateTime.now(ZoneOffset.UTC)
        );

        ContactMessage savedMessage = repository.save(contactMessage);

        return new ContactResponse(
                savedMessage.getId(),
                "Contact message submitted successfully",
                savedMessage.getSubmittedAt()
        );
    }
}