<template>
  <div class="container mt-4">
    <div
      class="header d-flex justify-content-between align-items-center mb-3 p-3"
    >
      <h2 class="title">Liste des Inscriptions</h2>
      <router-link class="btn btn-add" :to="{ name: 'registration-add' }"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-light border-top">
        <tr>
          <th>ID</th>
          <th>Nom de l'Apprénents</th>
          <th>date d'inscription</th>
          <th>Module</th>
          <th>Date Début</th>
          <th>Date Fin</th>
          <th>Montant</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="registration in store.registrations.sort(
            (a, b) => a.id - b.id
          )"
          :key="registration.id"
        >
          <td>{{ registration.id }}</td>
          <td>{{ registration.student.fullName }}</td>
          <td>
            {{ new Date(registration.dateRegister).toLocaleDateString() }}
          </td>
          <td>{{ registration.module.name }}</td>
          <td>{{ new Date(registration.startDate).toLocaleDateString() }}</td>
          <td>{{ new Date(registration.endDate).toLocaleDateString() }}</td>
          <td>{{ registration.mount }}</td>

          <td class="text-center">
            <router-link
              class="action-icon"
              :to="{
                name: 'registration-show',
                params: { id: registration.id },
              }"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link
              class="action-icon"
              :to="{
                name: 'registration-eddit',
                params: { id: registration.id },
              }"
            >
              <i class="fas fa-edit"></i>
            </router-link>
            <button
              class="action-icon btn-delete"
              @click="store.destroy(registration.id)"
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
import { storeRegistration } from "@/stores/storeRegistration";
import { onMounted, ref } from "vue";
const store = storeRegistration();
// const registrations = ref([
//   {
//     id: 1,
//     dateRegister: "2024-05-26",
//     startDate: "2024-06-01",
//     endDate: "2024-06-25",
//     mount: 2000,
//     student: { fullName: "Harouna", phoneNumber: "20050607" },
//     module: { name: "Comptabilité" },
//   },
// ]);

onMounted(async () => {
  try {
    const result = await store.loadData();
    // registrations.value = result;
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

