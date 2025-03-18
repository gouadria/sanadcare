import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Votre instance Axios configurée
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function Template() {
  // État pour le formulaire de rendez-vous
  const [appointment, setAppointment] = useState({
    name: '',
    email: '',
    phone: '',
    date: '', // Seule la date sera saisie (format "YYYY-MM-DD")
    department: '',
    doctor: '',
    message: ''
  });
  const [departments, setDepartments] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Chargement des départements et des médecins depuis l'API, en filtrant ceux qui ne sont pas souhaités
  useEffect(() => {
    api.get('/api/departments')
      .then(res => {
        const filteredDepartments = res.data.filter(dep => {
          const name = dep.name.toLowerCase();
          return name !== 'administration' && name !== 'infermiere';
        });
        setDepartments(filteredDepartments);
      })
      .catch(err => console.error('Erreur lors du chargement des départements:', err));

    api.get('/api/doctors')
      .then(res => {
        const filteredDoctors = res.data.filter(doc =>
          doc.department &&
          doc.department.name.toLowerCase() !== 'administration' &&
          doc.department.name.toLowerCase() !== 'infermiere'
        );
        setAllDoctors(filteredDoctors);
        setDoctors(filteredDoctors);
      })
      .catch(err => console.error('Erreur lors du chargement des médecins:', err));
  }, []);

  // Lorsqu'on change de département, filtrer la liste des médecins disponibles dans ce département
  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    setAppointment(prev => ({ ...prev, department: deptId, doctor: '' }));
    const filteredDoctors = allDoctors.filter(doc => doc.department && doc.department.id === deptId);
    setDoctors(filteredDoctors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointment.department || !appointment.doctor || !appointment.date) {
      alert("Veuillez sélectionner un département, un docteur et une date.");
      return;
    }
    console.log("ID du docteur sélectionné:", appointment.doctor);
    // Construction de l'endpoint avec backticks (ligne 63)
    const endpoint = `/api/appointments/create/${appointment.doctor}`;
    console.log("Endpoint utilisé :", endpoint);
    
    // (Ligne 65–68) Création de l'objet DTO avec les clés attendues par le backend
    const appointmentDto = {
      Name: appointment.name,
      Email: appointment.email,
      Phone: appointment.phone,
      Date: appointment.date,
      DepartmentId: String(appointment.department),
      DoctorId: String(appointment.doctor),
      Message: appointment.message
    };
    
    // Utilisation de l'objet DTO dans l'appel POST
    api.post(endpoint, appointmentDto)
      .then(res => {
        // Le backend renvoie l'objet visit avec le créneau horaire attribué (propriété "date" en camelCase)
        const visit = res.data;
        const scheduledTime = new Date(visit.date).toLocaleString();
        alert(`Votre rendez-vous est confirmé pour le ${scheduledTime}.`);
        console.log("Réponse de l'API :", res.data);
        setAppointment({
          name: '',
          email: '',
          phone: '',
          date: '',
          department: '',
          doctor: '',
          message: ''
        });
      })
      .catch(err => {
        let errorMessage = "";
        if (err.response && err.response.data) {
          errorMessage = typeof err.response.data === 'object'
            ? JSON.stringify(err.response.data)
            : err.response.data;
        } else {
          errorMessage = err.message;
        }
        console.error('Erreur lors de la soumission du formulaire:', errorMessage);
        alert('Erreur lors de la soumission de votre demande : ' + errorMessage);
      });
  };

  return (
    <>
      <header id="header" className="header sticky-top">
        <div className="topbar d-flex align-items-center">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">
              <i className="bi bi-envelope d-flex align-items-center">
                <a href="mailto:contact@example.com">gouadriaanis@zohomail.com</a>
              </i>
              <i className="bi bi-phone d-flex align-items-center ms-4">
                <span>+966 0544284596</span>
              </i>
            </div>
            <div className="social-links d-none d-md-flex align-items-center">
              <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="branding d-flex align-items-center">
          <div className="container position-relative d-flex align-items-center justify-content-between">
            <a href="index.html" className="logo d-flex align-items-center me-auto">
              <h1 className="sitename">SanadCare (سند كير)</h1>
            </a>
            <nav id="navmenu" className="navmenu">
              <ul>
                <li><a href="#hero" className="active">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#departments">Departments</a></li>
                <li><a href="#doctors">Doctors</a></li>
                <li className="dropdown">
                  <a href="#"><span>Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                  <ul>
                    <li><a href="#">Dropdown 1</a></li>
                    <li className="dropdown">
                      <a href="#"><span>Deep Dropdown</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                      <ul>
                        <li><a href="#">Deep Dropdown 1</a></li>
                        <li><a href="#">Deep Dropdown 2</a></li>
                        <li><a href="#">Deep Dropdown 3</a></li>
                        <li><a href="#">Deep Dropdown 4</a></li>
                        <li><a href="#">Deep Dropdown 5</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Dropdown 2</a></li>
                    <li><a href="#">Dropdown 3</a></li>
                    <li><a href="#">Dropdown 4</a></li>
                  </ul>
                </li>
                <li><a href="#contact">Contact</a></li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a className="cta-btn d-none d-sm-block" href="#appointment">Make an Appointment</a>
          </div>
        </div>
      </header>
      <main className="main">
        <section id="hero" className="hero section light-background">
          <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />
          <div className="container position-relative">
            <div className="welcome position-relative" data-aos="fade-down" data-aos-delay="100">
              <h2>WELCOME TO SANADCARE</h2>
            </div>
            <div className="content row gy-4">
              <div className="col-lg-4 d-flex align-items-stretch">
                <div className="why-box" data-aos="zoom-out" data-aos-delay="200">
                  <h3>Why Choose SANADCARE?</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Duis aute irure dolor in reprehenderit Asperiores dolores sed et. Tenetur quia eos. Autem tempore quibusdam vel necessitatibus optio ad corporis.
                  </p>
                  <div className="text-center">
                    <a href="#about" className="more-btn">
                      <span>Learn More</span> <i className="bi bi-chevron-right"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 d-flex align-items-stretch">
                <div className="d-flex flex-column justify-content-center">
                  <div className="row gy-4">
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box" data-aos="zoom-out" data-aos-delay="300">
                        <i className="bi bi-clipboard-data"></i>
                        <h4>Corporis voluptates officia eiusmod</h4>
                        <p>Consequuntur sunt aut quasi enim aliquam quae harum pariatur laboris nisi ut aliquip</p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box" data-aos="zoom-out" data-aos-delay="400">
                        <i className="bi bi-gem"></i>
                        <h4>Ullamco laboris ladore pan</h4>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt</p>
                      </div>
                    </div>
                    <div className="col-xl-4 d-flex align-items-stretch">
                      <div className="icon-box" data-aos="zoom-out" data-aos-delay="500">
                        <i className="bi bi-inboxes"></i>
                        <h4>Labore consequatur incidid dolore</h4>
                        <p>Aut suscipit aut cum nemo deleniti aut omnis. Doloribus ut maiores omnis facere</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION APPOINTMENT */}
        <section id="appointment" className="appointment section">
          <div className="container section-title" data-aos="fade-up">
            <h2>Appointment</h2>
            <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
          </div>
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <form onSubmit={handleSubmit} className="php-email-form">
              {/* Ligne 1 : Nom, Email, Téléphone */}
              <div className="row">
                <div className="col-lg-4">
                  <TextField
                    fullWidth
                    label="Votre nom"
                    name="name"
                    value={appointment.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-4">
                  <TextField
                    fullWidth
                    type="email"
                    label="Votre email"
                    name="email"
                    value={appointment.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-4">
                  <TextField
                    fullWidth
                    type="tel"
                    label="Votre téléphone"
                    name="phone"
                    value={appointment.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* Ligne 2 : Date, Département, Docteur */}
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-lg-4">
                  <TextField
                    fullWidth
                    type="date"
                    label="Date du rendez-vous"
                    name="date"
                    value={appointment.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </div>
                <div className="col-lg-4">
                  <FormControl fullWidth required>
                    <InputLabel id="department-label">Sélectionner un département</InputLabel>
                    <Select
                      labelId="department-label"
                      name="department"
                      value={appointment.department}
                      label="Sélectionner un département"
                      onChange={(e) => {
                        handleChange(e);
                        handleDepartmentChange(e);
                      }}
                    >
                      <MenuItem value="">
                        <em>Sélectionner un département</em>
                      </MenuItem>
                      {departments.map(dep => (
                        <MenuItem key={dep.id} value={dep.id}>
                          {dep.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-lg-4">
                  <FormControl fullWidth required>
                    <InputLabel id="doctor-label">Sélectionner un docteur</InputLabel>
                    <Select
                      labelId="doctor-label"
                      name="doctor"
                      value={appointment.doctor}
                      label="Sélectionner un docteur"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Sélectionner un docteur</em>
                      </MenuItem>
                      {doctors.map(doc => (
                        <MenuItem key={doc.id} value={doc.id}>
                          {doc.fullName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              {/* Ligne 3 : Message */}
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-lg-12">
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Message (optionnel)"
                    name="message"
                    value={appointment.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* Bouton de soumission */}
              <div className="row" style={{ marginTop: '16px' }}>
                <div className="col-lg-12 text-center">
                  <Button type="submit" variant="contained" color="primary">
                    Prendre un rendez-vous
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}

export default Template;
