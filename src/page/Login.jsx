import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEnvelope, FaUserGraduate } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost/backend_raju/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (data.status === 'success') {
        console.log('Login Success');
        navigate('/dashboard');
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(0, 34, 68, 0.8), rgba(0, 82, 73, 0.8)), url("./images/bg.jpg") no-repeat center center/cover',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
        padding: '40px',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <FaUserGraduate size={36} color="#4CAF50" />
        </div>
        
        <h2 style={{
          color: '#002244',
          marginBottom: '30px',
          fontSize: '1.8rem',
          position: 'relative'
        }}>
          Student Portal Login
          <span style={{
            position: 'absolute',
            bottom: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '3px',
            backgroundColor: '#4CAF50'
          }}></span>
        </h2>
        
        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#002244',
              fontWeight: '500'
            }}>
              Email Address
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'absolute',
                left: '15px',
                color: '#4CAF50'
              }}>
                <FaEnvelope />
              </div>
              <input 
                type="email" 
                placeholder="Enter your college email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 45px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    borderColor: '#4CAF50',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.2)',
                    outline: 'none'
                  }
                }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '25px', position: 'relative' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#002244',
              fontWeight: '500'
            }}>
              Password
            </label>
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'absolute',
                left: '15px',
                color: '#4CAF50'
              }}>
                <FaLock />
              </div>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 45px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  transition: 'all 0.3s ease',
                  ':focus': {
                    borderColor: '#4CAF50',
                    boxShadow: '0 0 0 3px rgba(76, 175, 80, 0.2)',
                    outline: 'none'
                  }
                }}
              />
            </div>
            <div style={{ textAlign: 'right', marginTop: '8px' }}>
              <a href="#" style={{
                color: '#4CAF50',
                fontSize: '0.9rem',
                textDecoration: 'none',
                ':hover': {
                  textDecoration: 'underline'
                }
              }}>
                Forgot Password?
              </a>
            </div>
          </div>
          
          <button type="submit" style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#002244',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            marginBottom: '20px',
            ':hover': {
              backgroundColor: '#4CAF50',
              transform: 'translateY(-2px)'
            }
          }}>
            Login
          </button>
          
          <div style={{ textAlign: 'center', color: '#666' }}>
            Don't have an account?{' '}
            <a href="#" style={{
              color: '#4CAF50',
              fontWeight: '500',
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline'
              }
            }}>
              Contact Admin
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;