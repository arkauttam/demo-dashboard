import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional(),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showFakeSignup, setShowFakeSignup] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    // Fake login - accept any credentials
    console.log("Login data:", data);
    
    // Store user info in localStorage if remember me is checked
    if (data.remember) {
      localStorage.setItem("userEmail", data.email);
    } else {
      sessionStorage.setItem("userEmail", data.email);
    }
    
    navigate("/dashboard");
  };

  const onSignupSubmit = (data: SignupFormData) => {
    // Fake signup - just show success message
    console.log("Signup data:", data);
    setShowFakeSignup(true);
    
    // Auto switch to login after 2 seconds
    setTimeout(() => {
      setShowFakeSignup(false);
      setIsLogin(true);
      // Pre-fill email in login form
      loginForm.setValue("email", data.email);
    }, 2000);
  };

  const switchToSignup = () => {
    setIsLogin(false);
    loginForm.reset();
    setShowPassword(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
    signupForm.reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[420px] animate-fade-in">
        <div className="bg-card rounded-lg sneat-shadow-lg p-8 md:p-10">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Dashboard</span>
          </div>

          <h4 className="text-lg font-semibold text-foreground mb-1">
            {isLogin ? "Welcome to Sneat! 👋" : "Join Sneat! 🚀"}
          </h4>
          <p className="text-sm text-muted-foreground mb-6">
            {isLogin 
              ? "Please sign-in to your account and start the adventure" 
              : "Create your account and start your journey with us"}
          </p>

          {showFakeSignup && (
            <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
              ✅ Account created successfully! Redirecting to login...
            </div>
          )}

          {isLogin ? (
            // Login Form
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  {...loginForm.register("email")}
                  placeholder="admin@sneat.com"
                  className="w-full h-10 px-3 rounded-md border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-red-500 mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...loginForm.register("password")}
                    placeholder="············"
                    className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-red-500 mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  {...loginForm.register("remember")}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="text-sm text-foreground">Remember Me</label>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity sneat-shadow"
              >
                Sign in
              </button>
            </form>
          ) : (
            // Signup Form
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <input
                  type="text"
                  {...signupForm.register("name")}
                  placeholder="John Doe"
                  className="w-full h-10 px-3 rounded-md border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {signupForm.formState.errors.name && (
                  <p className="text-xs text-red-500 mt-1">{signupForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  {...signupForm.register("email")}
                  placeholder="john@example.com"
                  className="w-full h-10 px-3 rounded-md border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                {signupForm.formState.errors.email && (
                  <p className="text-xs text-red-500 mt-1">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...signupForm.register("password")}
                    placeholder="············"
                    className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {signupForm.formState.errors.password && (
                  <p className="text-xs text-red-500 mt-1">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...signupForm.register("confirmPassword")}
                    placeholder="············"
                    className="w-full h-10 px-3 pr-10 rounded-md border border-input bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity sneat-shadow"
              >
                Create Account
              </button>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "New on our platform?" : "Already have an account?"}{" "}
            <button 
              onClick={isLogin ? switchToSignup : switchToLogin}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </p>

          {isLogin && (
            <>
              <div className="flex items-center gap-3 mt-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="flex items-center justify-center gap-3 mt-4">
                {["M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
                  "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                  "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                ].map((path, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-md border border-input flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-muted-foreground">
                      <path d={path} />
                    </svg>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;