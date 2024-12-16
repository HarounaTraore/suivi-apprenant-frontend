<template>
  <div class="container mt-4">
    <div
      class="header d-flex justify-content-between align-items-center mb-3 p-3"
    >
      <h2 class="title">Liste des Apprénents</h2>
      <router-link class="btn btn-add" :to="{ name: 'student-add' }"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-light border-top">
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Tuteur</th>
          <th>Adresse</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="student in store.students" :key="student.id">
          <td>{{ student.fullName }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.phoneNumber }}</td>
          <td>{{ student.tutor }}</td>
          <td>{{ student.address }}</td>

          <td class="text-center">
            <router-link
              class="action-icon"
              :to="{ name: 'student-show', params: { id: student.id } }"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link
              class="action-icon"
              :to="{ name: 'student-eddit', params: { id: student.id } }"
            >
              <i class="fas fa-edit"></i>
            </router-link>
            <button
              class="action-icon btn-delete"
              @click="store.destroy(student.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { storeStudent } from "@/stores/storeStudent";
import { onMounted, ref } from "vue";
const store = storeStudent();

onMounted(async () => {
  try {
    const result = await store.loadData();
    students.value = result;
    console.log(result);
  } catch (error) {}
});
</script>

<style scoped>
.container {
  max-width: 1000px;
}

.header {
  background-color: #f5f5dc;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.title {
  font-size: 1.2rem;
  margin: 0;
  color: #218838;
}

.search-input {
  max-width: 200px;
}

.btn-add {
  font-size: 1rem;
  padding: 5px 15px;
  background-color: white;
  color: #218838;
  border: 1px solid #218838;
  border-radius: 5px;
}

.btn-add:hover {
  background-color: #218838;
  color: white;
}

.table {
  width: 100%;
}

.table thead {
  border-top: 2px solid #218838;
}

.action-icon {
  color: #218838;
  margin-right: 8px;
  font-size: 1.2rem;
  background: none;
  border: none;
  cursor: pointer;
}

.action-icon:hover {
  color: #1e7e34;
}

.btn-delete {
  color: #dc3545;
}

.btn-delete:hover {
  color: #c82333;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}
</style>

