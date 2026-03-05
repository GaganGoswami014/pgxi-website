import { useState, useRef, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowLeft, RefreshCw } from "lucide-react";
import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

const OTP_LENGTH = 6;

const OtpStep = () => {
  const { pendingEmail, verifyOtp, resendOtp, cancelOtp } = useAuth();
  const { toast } = useToast();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (digit && newOtp.every((d) => d !== "")) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newOtp = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, i) => (newOtp[i] = d));
    setOtp(newOtp);
    const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIdx]?.focus();

    if (newOtp.every((d) => d !== "")) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleVerify = async (code: string) => {
    setSubmitting(true);
    const { error } = await verifyOtp(code);
    if (error) {
      toast({
        title: "Invalid Code",
        description: "The verification code is incorrect or has expired.",
        variant: "destructive",
      });
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
    setSubmitting(false);
  };

  const handleResend = async () => {
    setResending(true);
    const { error } = await resendOtp();
    if (error) {
      toast({ title: "Resend failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Code resent", description: "Check your inbox for a new code." });
    }
    setResending(false);
  };

  return (
    <>
      <CardHeader className="pb-4 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">Two-Factor Verification</h2>
        <p className="text-sm text-muted-foreground mt-1">
          We sent a 6-digit code to<br />
          <span className="font-medium text-foreground">{pendingEmail}</span>
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* OTP Input */}
          <div className="flex justify-center gap-2" onPaste={handlePaste}>
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                disabled={submitting}
                className="w-11 h-13 text-center text-xl font-bold rounded-lg border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all disabled:opacity-50"
              />
            ))}
          </div>

          {/* Verify */}
          <Button
            onClick={() => handleVerify(otp.join(""))}
            disabled={submitting || otp.some((d) => !d)}
            className="w-full h-11 font-semibold"
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Verifying…
              </div>
            ) : (
              "Verify & Sign In"
            )}
          </Button>

          {/* Resend + Back */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={cancelOtp}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Back
            </button>
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
              Resend code
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Didn't receive the email? Check your spam folder.
          </p>
        </div>
      </CardContent>
    </>
  );
};

const PasswordStep = () => {
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Access Denied",
        description: "Invalid credentials or insufficient permissions.",
        variant: "destructive",
      });
    }
    setSubmitting(false);
  };

  return (
    <>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Secure Login</span>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@pgxi.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold"
            disabled={submitting}
          >
            {submitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Verifying…
              </div>
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            This system is restricted to authorized administrators only.
            <br />Unauthorized access attempts are logged.
          </p>
        </div>
      </CardContent>
    </>
  );
};

const Login = () => {
  const { session, isAdmin, isLoading, authStep } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/admin/dashboard";

  if (!isLoading && session && isAdmin) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <img src={logoLight} alt="PG-XI Creatives" className="h-20 mx-auto mb-4 dark:hidden" />
          <img src={logoDark} alt="PG-XI Creatives" className="h-20 mx-auto mb-4 hidden dark:block" />
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Control Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">Admin access only · Unauthorized entry prohibited</p>
        </div>

        <Card className="border border-border shadow-xl shadow-black/5">
          {authStep === "awaiting_otp" ? <OtpStep /> : <PasswordStep />}
        </Card>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className={`w-2 h-2 rounded-full transition-colors ${authStep === "idle" ? "bg-primary" : "bg-muted-foreground/30"}`} />
          <div className={`w-2 h-2 rounded-full transition-colors ${authStep === "awaiting_otp" ? "bg-primary" : "bg-muted-foreground/30"}`} />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          PG-XI Creatives · Growth Control System
        </p>
      </div>
    </div>
  );
};

export default Login;
