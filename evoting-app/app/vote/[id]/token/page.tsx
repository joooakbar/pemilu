"use client";
import OTPCard from "@/features/voter/OTP/components/OTPCard";
import OTPHeader from "@/features/voter/OTP/components/OTPHeader";
import OTPVerification from "@/features/voter/OTP/components/OTPVerification";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Loader2, KeyRound } from "lucide-react";
import OtpForm from "@/features/voter/OTP/components/OTPVerification";
// const schema = z.object({
//   token: z.string().length(6, "Token harus 6 karakter").toUpperCase(),
// });
// type FormData = z.infer<typeof schema>;

// export default function TokenPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });

//   const onSubmit = async ({ token }: FormData) => {
//     setLoading(true);
//     const nik = sessionStorage.getItem("voter_nik") ?? "";
//     const electionId = sessionStorage.getItem("electionId") ?? "";
//     try {
//       const res = await fetch("/api/voter/verify-token", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ nik, token, electionId }),
//       });
//       const json = await res.json();
//       if (!res.ok) {
//         toast.error(json.error ?? "Token salah");
//         return;
//       }

//       sessionStorage.setItem("voter_tokenId", json.data.tokenId);
//       router.push("/vote/surat-suara");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const nama =
//     typeof window !== "undefined"
//       ? (sessionStorage.getItem("voter_nama") ?? "")
//       : "";

//   return (
//     <div className="min-h-screen flex-center bg-gradient-to-br from-primary/10 to-accent/10 px-4">
//       <Card className="w-full max-w-md shadow-xl">
//         <CardHeader className="text-center pb-4">
//           <div className="mx-auto w-14 h-14 bg-primary rounded-2xl flex-center text-white text-2xl mb-2">
//             🔑
//           </div>
//           <CardTitle>Masukkan Token</CardTitle>
//           <CardDescription>
//             Halo <strong>{nama}</strong>, masukkan token 6 karakter yang dikirim
//             ke WhatsApp/email Anda
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="space-y-1">
//               <Label htmlFor="token">Token OTP</Label>
//               <div className="relative">
//                 <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   id="token"
//                   placeholder="A1B2C3"
//                   className="pl-9 tracking-[0.4em] text-center text-xl font-bold uppercase"
//                   maxLength={6}
//                   {...register("token")}
//                 />
//               </div>
//               {errors.token && (
//                 <p className="text-destructive text-sm">
//                   {errors.token.message}
//                 </p>
//               )}
//             </div>
//             <Button type="submit" className="w-full" disabled={loading}>
//               {loading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 animate-spin mr-2" />
//                   Verifikasi...
//                 </>
//               ) : (
//                 "Verifikasi Token"
//               )}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export default function TokenPage() {
  return (
    <section id="screen-auth">
      <OTPCard />
    </section>
  );
}
