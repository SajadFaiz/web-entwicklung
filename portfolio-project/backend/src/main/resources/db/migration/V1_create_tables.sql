CREATE TABLE portfolio_comments
(
    id          BIGSERIAL PRIMARY KEY,
    author_name VARCHAR(80)   NOT NULL,
    content     VARCHAR(1000) NOT NULL,
    created_at  TIMESTAMPTZ   NOT NULL
);

CREATE INDEX idx_portfolio_comments_created_at
    ON portfolio_comments (created_at DESC);

CREATE TABLE contact_messages
(
    id           BIGSERIAL PRIMARY KEY,
    name         VARCHAR(100)  NOT NULL,
    email        VARCHAR(200)  NOT NULL,
    subject      VARCHAR(150)  NOT NULL,
    message      VARCHAR(3000) NOT NULL,
    submitted_at TIMESTAMPTZ   NOT NULL
);

CREATE INDEX idx_contact_messages_submitted_at
    ON contact_messages (submitted_at DESC);

INSERT INTO portfolio_comments (
    author_name,
    content,
    created_at
)
VALUES (
    'Portfolio Visitor',
    'Clean portfolio and interesting projects.',
    CURRENT_TIMESTAMP
);