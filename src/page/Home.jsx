import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaChalkboardTeacher, FaFlask, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false
    });
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: 'hidden' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 5%',
        backgroundColor: 'rgba(0, 34, 68, 0.9)',
        color: 'white',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <span style={{ color: '#4CAF50' }}>TN</span>Poly
        </div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Home', 'About', 'Programs', 'Facilities', 'Contact'].map((item, index) => (
            <a key={index} href={`#${item.toLowerCase()}`} style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              ':hover': { color: '#4CAF50' }
            }}>
              {item}
            </a>
          ))}
          <Link to="/admission">
            <button style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Apply Now
            </button>
          </Link>

          <Link to="/staff-login">
            <button style={{
              padding: '0.5rem 1.5rem',
              backgroundColor: 'transparent',
              color: 'white',
              border: '2px solid #4CAF50',
              borderRadius: '50px',
              fontWeight: '500',
              cursor: 'pointer',
            }}>
              Staff Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(0, 34, 68, 0.8), rgba(0, 82, 73, 0.8)), url("./images/bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        color: 'white',
        padding: '0 5%',
        marginTop: '0px',
        paddingTop: '50px'
      }}>
        <div style={{ maxWidth: '800px' }} data-aos="fade-right" data-aos-delay="100">
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Shaping <span style={{ color: '#4CAF50' }}>Future</span> Technical Leaders
          </h1>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: '0.9'
          }}>
            Tamil Nadu Government Polytechnic College offers industry-relevant programs with hands-on training and modern facilities to prepare students for successful careers.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href='./admission'>
              <button style={{
                padding: '0.8rem 2rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }
              }}>
                Admission
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        backgroundColor: 'white',
        padding: '4rem 5%',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '2rem',
        boxShadow: '0 15px 25px rgba(0, 0, 0, 0.43)',
        margin: '-50px auto 0',
        maxWidth: '1200px',
        borderRadius: '50px',
        position: 'relative',
        zIndex: 10
      }}>
        {[
          { number: '50+', label: 'Years of Excellence' },
          { number: '10,000+', label: 'Alumni Network' },
          { number: '95%', label: 'Placement Rate' },
          { number: '15+', label: 'Industry Partners' }
        ].map((stat, index) => (
          <div key={index} style={{ textAlign: 'center' }} data-aos="fade-up" data-aos-delay={index * 100}>
            <h3 style={{ fontSize: '2.5rem', color: '#002244', marginBottom: '0.5rem' }}>{stat.number}</h3>
            <p style={{ color: '#666' }}>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '8rem 5%',
        backgroundColor: '#f9f9f9'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4rem'
        }}>
          <div style={{ flex: '1', minWidth: '300px' }} data-aos="fade-right" data-aos-anchor-placement="top-center">
            <h2 style={{
              fontSize: '2.5rem',
              color: '#002244',
              marginBottom: '1.5rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              About Our College
              <span style={{
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                width: '50px',
                height: '4px',
                backgroundColor: '#4CAF50'
              }}></span>
            </h2>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: '#555' }}>
              Established in 1970, Tamil Nadu Government Polytechnic College has been a pioneer in technical education, providing quality education and producing skilled professionals for various industries.
            </p>
            <p style={{ marginBottom: '1.5rem', lineHeight: '1.6', color: '#555' }}>
              Our campus spans over 25 acres with state-of-the-art laboratories, modern classrooms, and excellent sports facilities to ensure holistic development of our students.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <button style={{
                padding: '0.8rem 2rem',
                backgroundColor: '#002244',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': { backgroundColor: '#4CAF50' }
              }}>
                Learn More
              </button>
            </div>
          </div>
          <div style={{ flex: '1', minWidth: '300px', position: 'relative' }} data-aos="zoom-in" data-aos-delay="300">
            <div style={{
              width: '100%',
              height: '400px',
              borderRadius: '50px',
              background: 'url("./images/admin.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'top',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              right: '-30px',
              width: '200px',
              height: '200px',
              borderRadius: '50px',
              background: 'url("./images/bg.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '5px solid white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}></div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" style={{
        padding: '8rem 5%',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#002244',
            marginBottom: '1rem',
            position: 'relative',
            display: 'inline-block'
          }} data-aos="fade-up">
            Our Programs
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '4px',
              backgroundColor: '#4CAF50'
            }}></span>
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: '#666' }} data-aos="fade-up" data-aos-delay="100">
            We offer diploma programs designed to meet industry demands with practical training and theoretical knowledge.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {[
              { 
                title: 'Computer Engineering', 
                icon: <FaGraduationCap size={40} color="#4CAF50" />,
                description: 'Learn programming, networking, and software development with industry-standard tools.',
                duration: '3 Years'
              },
              { 
                title: 'Mechanical Engineering', 
                icon: <FaFlask size={40} color="#4CAF50" />,
                description: 'Master machine design, manufacturing processes, and automation technologies.',
                duration: '3 Years'
              },
              { 
                title: 'Civil Engineering', 
                icon: <FaChalkboardTeacher size={40} color="#4CAF50" />,
                description: 'Study construction techniques, surveying, and infrastructure development.',
                duration: '3 Years'
              }
            ].map((program, index) => (
              <div key={index} style={{
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                padding: '2rem',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                ':hover': { transform: 'translateY(-10px)', boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }
              }} data-aos="flip-up" data-aos-delay={index * 100}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'rgba(76, 175, 80, 0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  {program.icon}
                </div>
                <h3 style={{ color: '#002244', marginBottom: '1rem' }}>{program.title}</h3>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>{program.description}</p>
                <div style={{
                  backgroundColor: 'rgba(0, 34, 68, 0.05)',
                  padding: '0.5rem',
                  borderRadius: '5px',
                  color: '#002244',
                  fontWeight: '500'
                }}>
                  Duration: {program.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="facilities" style={{
        padding: '8rem 5%',
        backgroundColor: '#002244',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            position: 'relative',
            display: 'inline-block'
          }} data-aos="fade-right">
            Our Facilities
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '0',
              width: '50px',
              height: '4px',
              backgroundColor: '#4CAF50'
            }}></span>
          </h2>
          <p style={{ maxWidth: '700px', marginBottom: '3rem', opacity: '0.8' }} data-aos="fade-right" data-aos-delay="100">
            We provide world-class facilities to enhance learning and student experience.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { 
                title: 'Modern Labs', 
                description: 'Equipped with latest technology and software for practical learning.'
              },
              { 
                title: 'Library', 
                description: 'Extensive collection of books, journals, and digital resources.'
              },
              { 
                title: 'Sports Complex', 
                description: 'Facilities for cricket, football, basketball and indoor games.'
              },
              { 
                title: 'Hostel', 
                description: 'Safe and comfortable accommodation for outstation students.'
              }
            ].map((facility, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '10px',
                padding: '2rem',
                transition: 'all 0.3s ease',
                ':hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
              }} data-aos="zoom-in" data-aos-delay={index * 100}>
                <h3 style={{ marginBottom: '1rem', color: '#4CAF50' }}>{facility.title}</h3>
                <p style={{ opacity: '0.8' }}>{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{
        padding: '8rem 5%',
        backgroundColor: '#f9f9f9'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#002244',
            marginBottom: '1rem',
            position: 'relative',
            display: 'inline-block'
          }} data-aos="fade-up">
            What Our Students Say
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '50px',
              height: '4px',
              backgroundColor: '#4CAF50'
            }}></span>
          </h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: '#666' }} data-aos="fade-up" data-aos-delay="100">
            Hear from our students about their experiences at our college.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { 
                name: 'Ramesh Kumar', 
                role: 'Computer Engineering, 2022',
                quote: 'The practical approach to learning helped me secure a job at a top IT company immediately after graduation.',
                image: 'https://randomuser.me/api/portraits/men/32.jpg'
              },
              { 
                name: 'Priya S', 
                role: 'Mechanical Engineering, 2021',
                quote: 'The faculty goes beyond textbooks to provide real-world insights that are invaluable in industry.',
                image: 'https://randomuser.me/api/portraits/women/44.jpg'
              },
              { 
                name: 'Arun V', 
                role: 'Civil Engineering, 2023',
                quote: 'The campus placements are excellent with top construction companies visiting every year.',
                image: 'https://randomuser.me/api/portraits/men/75.jpg'
              }
            ].map((testimonial, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '2rem',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                textAlign: 'left'
              }} data-aos="fade-up" data-aos-delay={index * 100}>
                <p style={{ 
                  fontStyle: 'italic', 
                  marginBottom: '2rem', 
                  color: '#555',
                  position: 'relative',
                  paddingLeft: '1.5rem'
                }}>
                  <span style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    fontSize: '3rem',
                    lineHeight: '1',
                    color: 'rgb(4, 200, 10)'
                  }}>"</span>
                  {testimonial.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div>
                    <h4 style={{ margin: '0', color: '#002244' }}>{testimonial.name}</h4>
                    <p style={{ margin: '0', color: '#4CAF50', fontSize: '0.9rem' }}>{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '8rem 5%',
        backgroundColor: 'white'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4rem'
        }}>
          <div style={{ flex: '1', minWidth: '300px' }} data-aos="fade-right">
            <h2 style={{
              fontSize: '2.5rem',
              color: '#002244',
              marginBottom: '1.5rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              Contact Us
              <span style={{
                position: 'absolute',
                bottom: '-10px',
                left: '0',
                width: '50px',
                height: '4px',
                backgroundColor: '#4CAF50'
              }}></span>
            </h2>
            <p style={{ marginBottom: '2rem', color: '#555' }}>
              Have questions or want to learn more about our programs? Reach out to us.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FaMapMarkerAlt color="#4CAF50" size={20} />
                <span>123 College Road, Madurai, Tamil Nadu 625002</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FaPhone color="#4CAF50" size={20} />
                <span>+91 9361109518</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FaEnvelope color="#4CAF50" size={20} />
                <span>info@tnpoly.edu.in</span>
              </div>
            </div>
            
            <div>
              <h3 style={{ color: '#002244', marginBottom: '1rem' }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social, index) => (
                  <div key={index} style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    ':hover': { backgroundColor: '#4CAF50', color: 'white' }
                  }}>
                    {social[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ flex: '1', minWidth: '300px' }} data-aos="fade-left" data-aos-delay="200">
            <form style={{
              backgroundColor: '#f9f9f9',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: '#002244',
                  fontWeight: '500'
                }}>Name</label>
                <input type="text" style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem'
                }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: '#002244',
                  fontWeight: '500'
                }}>Email</label>
                <input type="email" style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem'
                }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  color: '#002244',
                  fontWeight: '500'
                }}>Message</label>
                <textarea style={{
                  width: '100%',
                  padding: '0.8rem',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  minHeight: '120px'
                }}></textarea>
              </div>
              <button style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#002244',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                ':hover': { backgroundColor: '#4CAF50' }
              }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#001a33',
        color: 'white',
        padding: '4rem 5% 2rem'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          <div data-aos="fade-up">
            <h3 style={{ 
              fontSize: '1.5rem', 
              marginBottom: '1.5rem',
              color: '#4CAF50'
            }}>
              <span style={{ color: 'white' }}>TN</span>Poly
            </h3>
            <p style={{ opacity: '0.8', lineHeight: '1.6' }}>
              Committed to excellence in technical education since 1970.
            </p>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="100">
            <h4 style={{ marginBottom: '1.5rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {['Home', 'About', 'Programs', 'Facilities', 'Contact'].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.8rem' }}>
                  <a href={`#${link.toLowerCase()}`} style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: '0.8',
                    transition: 'all 0.3s ease',
                    ':hover': { opacity: '1', color: '#4CAF50' }
                  }}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="200">
            <h4 style={{ marginBottom: '1.5rem' }}>Programs</h4>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {['Computer Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics Engineering'].map((program, index) => (
                <li key={index} style={{ marginBottom: '0.8rem' }}>
                  <a href="#" style={{
                    color: 'white',
                    textDecoration: 'none',
                    opacity: '0.8',
                    transition: 'all 0.3s ease',
                    ':hover': { opacity: '1', color: '#4CAF50' }
                  }}>
                    {program}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div data-aos="fade-up" data-aos-delay="300">
            <h4 style={{ marginBottom: '1.5rem' }}>Newsletter</h4>
            <p style={{ opacity: '0.8', marginBottom: '1rem' }}>
              Subscribe to our newsletter for latest updates.
            </p>
            <div style={{ display: 'flex' }}>
              <input type="email" placeholder="Your Email" style={{
                padding: '0.8rem',
                border: 'none',
                borderRadius: '5px 0 0 5px',
                flex: '1'
              }} />
              <button style={{
                padding: '0 1rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '0 5px 5px 0',
                cursor: 'pointer'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '2rem',
          textAlign: 'center',
          opacity: '0.7'
        }}>
          <p>&copy; {new Date().getFullYear()} Tamil Nadu Govt Polytechnic College. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;