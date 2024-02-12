package kz.jusan.backend.repository;

import kz.jusan.backend.entity.RoleEntity;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Integer> {
//    @Query("SELECT * FROM roles WHERE name = :name")
    RoleEntity findRoleEntityByName(String name);

//    @Query("SELECT * FROM roles WHERE id = :id")
    RoleEntity findRoleEntityById(int id);
}