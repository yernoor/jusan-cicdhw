package kz.jusan.backend.service;

import kz.jusan.backend.common.CustomMail;

public interface MailService {
    void sendMail(CustomMail mail);
}
