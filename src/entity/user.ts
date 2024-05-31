export type User = {
  id: string;
  name: string;
  email: string;
  notelp: string;
  pass: string;
  Prediciton: ListPrediction[];
};

export interface ListPrediction {
  id: string;
  gambar: string;
  hasil_prediksi: string;
  tgl: string;
  user_id: string;
}
