package kz.jusan.backend.repository;

import kz.jusan.backend.entity.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttachmentRepository extends JpaRepository<Attachment, String> {
    public List<Attachment> findAttachmentsByIin(String iin);

    void deleteAttachmentsByIin(String iin);
}
