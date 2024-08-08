// Uses the same styles as Product
import styles from "./Product.module.css";
import city from "../assets/img-2.jpg";
import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            For just $9 a month, you can unlock the full potential of Worldwide. 
            Enjoy unlimited access to all features, including the ability to mark unlimited locations, add detailed notes, and upload photos to your travel diary. 
            Our premium plan ensures that your travel memories are securely stored and easily accessible whenever you need them. 
            Join our community of travelers and start documenting your adventures in a way that's both fun and meaningful. 
            With Worldwide, your journeys are just a click away.
          </p>
        </div>
        <img src={city} alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
