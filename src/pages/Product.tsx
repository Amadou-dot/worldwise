import styles from "./Product.module.css";
import sunset from "../assets/img-1.jpg";
import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src={sunset}
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Worldwide is a web app designed for avid travelers who want to keep track of all the places they've visited. 
            With Worldwide, you can easily mark locations on a map, add detailed notes about your experiences, and even upload photos to create a rich travel diary. 
            Whether you're exploring new cities, hiking through national parks, or relaxing on a beach, Worldwide helps you document your journey and share it with friends and family. 
            The app's intuitive interface makes it simple to navigate and update your travel log, ensuring that you never forget a moment of your adventures. 
            Join the Worldwide community today and start chronicling your travels in a way that's both fun and meaningful.
          </p>

        </div>
      </section>
    </main>
  );
}
