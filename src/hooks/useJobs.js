import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export  function useJobs() {
  const { currentUser } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!currentUser) {
      setJobs([]);
      setLoading(false);
      return;
    }

    const jobsRef = collection(db, "users", currentUser.uid, "jobs");
    const q = query(jobsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const jobList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJobs(jobList);
      setLoading(false);
    });

    return unsubscribe
  }, [currentUser]);

  async function addJob(jobData) {
    const jobsRef = collection(db, 'users',currentUser.uid, 'jobs')
    await addDoc(jobsRef,{
        ...jobData,
        createdAt: serverTimestamp(),
    })
    
  }

  async function updateJob(jobId) {
    const jobRef = doc(db,'users',currentUser.uid,'jobs',jobId)
    await updateDoc(jobRef, updates)
    
  }
  async function deleteJob(jobId) {
    const jobRef = doc(db,'users',currentUser.uid,'jobs',jobId)
    await deleteDoc(jobRef)
    
  }

  return (jobs, loading, addJob, updateJob, deleteJob)
}
