<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center justify-content-center mb-3 p-3">
      <h2 class="title">Ajouter un nouveau Module</h2>
    </div>
    <form @submit.prevent="submitForm" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nom du module:</label>
          <input
            v-model="module.name"
            class="form-control form-control-sm"
            :class="{'is-invalid': errors.name}"
            @blur="checkModuleExistence"
          />
          <div v-if="errors.name" class="invalid-feedback">
            {{ errors.name }}
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Durée du module: (en jours)</label>
          <input
            v-model="module.duration"
            class="form-control form-control-sm"
            :class="{'is-invalid': errors.duration}"
          />
          <div v-if="errors.duration" class="invalid-feedback">
            {{ errors.duration }}
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Montant:</label>
        <input
          v-model="module.price"
          class="form-control form-control-sm"
          type="text"
          :class="{'is-invalid': errors.price}"
        />
        <div v-if="errors.price" class="invalid-feedback">
          {{ errors.price }}
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Statut:</label>
        <select
          v-model="module.status"
          required
          class="form-control form-control-sm"
          :class="{'is-invalid': errors.status}"
        >
          <option :value="true">Disponible</option>
          <option :value="false">Non Disponible</option>
        </select>
        <div v-if="errors.status" class="invalid-feedback">
          {{ errors.status }}
        </div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">
          Enregistrer
        </button>
        <button
          type="button"
          @click="router.push({ name: 'module-list' })"
          class="btn btn-cancel flex-grow-1"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import router from "@/router";
import { storeModule } from "@/stores/storeModule";
import { ref } from "vue";
import axios from 'axios';

const store = storeModule();
const module = ref({
  name: "",
  duration: "",
  price: null,
  status: true,
});
const errors = ref({
  name: null,
  duration: null,
  price: null,
  status: null,
});

const checkModuleExistence = async () => {
  if (module.value.name) {
    try {
      const response = await axios.get(`/api/modules/check-name/${module.value.name}`);
      if (response.data.exists) {
        errors.value.name = "Un module avec ce nom existe déjà. Veuillez choisir un autre nom.";
      } else {
        errors.value.name = null;
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du module: ", error);
    }
  }
};

const validateForm = () => {
  let isValid = true;
  
 
  if (!module.value.name || module.value.name.length < 2 || module.value.name.length > 50) {
    errors.value.name = "Le nom du module doit contenir entre 2 et 50 caractères.";
    isValid = false;
  } else {
    errors.value.name = null;
  }

  if (!module.value.duration || isNaN(module.value.duration) || module.value.duration < 1) {
    errors.value.duration = "La durée doit être un nombre entier positif.";
    isValid = false;
  } else {
    errors.value.duration = null;
  }

  if (!module.value.price || isNaN(module.value.price) || module.value.price <= 0 || !/^\d+(\.\d{1,2})?$/.test(module.value.price)) {
    errors.value.price = "Le prix doit être un nombre entier positif.";
    isValid = false;
  } else {
    errors.value.price = null;
  }

  if (module.value.status === null) {
    errors.value.status = "Le statut est requis.";
    isValid = false;
  } else {
    errors.value.status = null;
  }

  return isValid;
};

const submitForm = async () => {
  if (validateForm()) {
    try {
      await store.addModule(
        module.value.name,
        parseInt(module.value.duration),
        parseFloat(module.value.price),
        module.value.status
      );
      router.push({ name: "module-list" });
    } catch (error) {
      console.log("Erreur lors de l'ajout du module: ", error);
    }
  }
};
</script>



<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.header {
  background-color: #f5f5dc;
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
}

.title {
  font-size: 1.4rem;
  color: #218838;
}

.styled-form {
  background: white;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-size: 0.9rem;
  color: #333;
}

.form-control-sm {
  border-radius: 5px;
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
}

.btn-primary {
  background-color: #218838;
  border-color: #218838;
  color: white;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}

.btn-cancel {
  background-color: transparent;
  color: #218838;
  border: 1px solid #218838;
  font-weight: bold;
}

.btn-cancel:hover {
  background-color: #218838;
  color: white;
}
</style>