from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score, davies_bouldin_score
from sklearn.preprocessing import StandardScaler
import pandas as pd

app = Flask(__name__)
CORS(app) 

@app.route('/', methods=['GET'])
def home():
    return "<h1>Mesin AI K-Means Geo Sawit Menyala Bosku! 🚀</h1>"

@app.route('/api/hitung-kmeans', methods=['POST'])
def hitung_kmeans():
    try:
        data_mentah = request.json['data'] 
        df = pd.DataFrame(data_mentah)

        # Proses Normalisasi Data untuk clustering yang adil
        scaler = StandardScaler()
        df_scaled = scaler.fit_transform(df[['elevasi', 'luas_lahan', 'curah_hujan']])

        hasil_evaluasi = []
        centroid_k3 = []
        titik_terklaster = [] 

        for k in range(2, 5):
            kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
            labels = kmeans.fit_predict(df_scaled) 
            
            sil_score = silhouette_score(df_scaled, labels)
            dbi_score = davies_bouldin_score(df_scaled, labels)
            
            # MENGAMBIL DETAIL KHUSUS UNTUK K=3 (MODEL TERBAIK)
            if k == 3:
                # Ambil Titik Pusat (Centroid) Asli hasil kalkulasi data sawit
                centers_scaled = kmeans.cluster_centers_
                centers_asli = scaler.inverse_transform(centers_scaled)
                
                for i, center in enumerate(centers_asli):
                    centroid_k3.append({
                        "nama": f"Centroid {i+1}",
                        "luas_lahan": round(center[1], 2),  # Masuk ke Sumbu X Grafik
                        "curah_hujan": round(center[2], 2), # Masuk ke Sumbu Y Grafik
                        "size": 250                         # Ukuran bulatan kuning diperbesar
                    })
                
                # Memasukkan data real tiap wilayah sawit beserta label klasternya
                for idx, row in df.iterrows():
                    titik_terklaster.append({
                        "nama": str(row['nama']),
                        "luas_lahan": float(row['luas_lahan']),
                        "curah_hujan": float(row['curah_hujan']),
                        "elevasi": float(row['elevasi']),
                        "clusterId": int(labels[idx]) + 1
                    })

            hasil_evaluasi.append({
                'k': k,
                'silhouette': round(sil_score, 3),
                'dbi': round(dbi_score, 3)
            })

        # Mengembalikan data real yang siap di-plot oleh Recharts
        return jsonify({
            'status': 'sukses', 
            'data': hasil_evaluasi,
            'centroid_optimal': centroid_k3,
            'titik_plot': titik_terklaster
        })

    except Exception as e:
        return jsonify({'status': 'error', 'pesan': str(e)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)