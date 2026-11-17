
import GapminderLinear from "./charts/GapminderLinear";
import GapminderLog from "./charts/GapminderLog";
import GapminderSqrt from "./charts/GapminderSqrt";
import Dendrogram from "./charts/Dendrogram";
import { data } from "./data/gapminder";
import "./App.css";

function App() {
  return (
    <main className="app">

      {/* PART 01 — INTRODUCTION */}

      <header className="page-header">

        <h1>Understanding the World Through Data</h1>

        <p className="intro">
          Same data, different perspectives. Exploring how
          the choice of scale influences the way we perceive
          and interpret global patterns.
        </p>

      </header>

      <section className="introduction">

        <div className="part-label">
          <span>01</span>
          <p className="eyebrow">INTRODUCTION</p>
        </div>

        <h2>Exploring the Gapminder Dataset</h2>

        <p>
          The Gapminder dataset brings together information
          about countries around the world, including <strong>GDP per
            capita, life expectancy, and population</strong>.
        </p>

        <p>
          These indicators allow us to explore the relationship
          between <strong>economic development and quality of life</strong>.
          However, the way we represent this information can
          strongly influence what we see.
        </p>

        <p>
          This study focuses on the <strong>role of scales in data
            visualization</strong>, comparing different transformations
          to understand how they affect the distribution of
          data and the perception of differences between countries.
        </p>

      </section>

      {/* PART 02 — UNDERSTANDING SCALES */}

      <section className="scale-introduction">

        <div className="part-label">
          <span>02</span>
          <p className="eyebrow">UNDERSTANDING SCALES</p>
        </div>

        <h2>Same data, different perspectives.</h2>

        <p>
          A scale determines how numerical values are translated
          into visual positions. It therefore plays an essential
          role in how we read and interpret a chart.
        </p>

        <p>
          A <strong>linear scale preserves absolute differences</strong>, while
          a <strong>logarithmic scale emphasizes relative differences</strong>.
          Square root scaling offers another way to redistribute
          visual space between smaller and larger values.
        </p>

        <p>
          To explore these differences, we apply <strong>three scaling
            methods to the same dataset</strong>. By comparing their
          representations, we can understand how each transformation
          influences the visibility of patterns and relationships.
        </p>

        <div className="scale-overview">

          <div>
            <span>02.1</span>
            <strong>Linear</strong>
            <p>Absolute differences</p>
          </div>

          <div>
            <span>02.2</span>
            <strong>Logarithmic</strong>
            <p>Relative differences</p>
          </div>

          <div>
            <span>02.3</span>
            <strong>Square root</strong>
            <p>Intermediate transformation</p>
          </div>

        </div>

      </section>

      {/* VISUALIZATION 01 — LINEAR SCALE */}

      <section className="visualization-section">

        <div className="part-label">
          <span>02.1</span>

          <div>
            <p className="eyebrow">
              SCALE TRANSFORMATION · FIRST APPROACH
            </p>

            <h2>Linear scale</h2>

            <p>
              Understanding absolute differences between countries.
            </p>
          </div>
        </div>

        <div className="chart-panel">
          <GapminderLinear data={data} />
        </div>

        <article className="analysis">

          <div className="analysis-header">
            <p className="eyebrow">ANALYSIS & INTERPRETATION</p>
            <h3>Understanding the linear scale</h3>
          </div>

          <h3>How does a linear scale work?</h3>

          <p>
            The visualization uses D3's
            <code> scaleLinear() </code>
            to position countries along the horizontal and
            vertical axes.
          </p>

          <p>
            A linear scale maps numerical values to positions
            while preserving proportional distances. <strong>Equal
              numerical intervals always correspond to equal
              visual distances.</strong>
          </p>

          <h3>Why is a linear scale less suitable here?</h3>

          <p>
            GDP per capita varies considerably between countries, with
            a small number of countries reaching exceptionally high
            values. This creates a <strong>highly uneven distribution</strong>
            that is difficult to represent effectively with a linear scale.
          </p>

          <p>
            Because a linear scale must accommodate the entire range
            of values, countries with lower and intermediate GDP per
            capita become concentrated in a relatively small portion
            of the chart. As a result, <strong>differences between these
              countries are difficult to distinguish</strong>, and many of
            the underlying patterns remain hidden.
          </p>

          <p>
            Although a linear scale accurately represents absolute
            differences, <strong>the large range of GDP per capita values
              limits the visibility of differences between countries
              with lower and intermediate values</strong> in this dataset.
          </p>

          <p>
            For this reason, alternative transformations, such as
            logarithmic and square root scales, can offer more
            informative representations.
          </p>

          <h3>Understanding the distribution of the ticks</h3>

          <p>
            On a linear scale, ticks are distributed at regular
            numerical intervals. Each step represents the same
            <strong>absolute difference</strong>, regardless of its position
            along the axis.
          </p>

          <p>
            For example, if the horizontal axis displays
            0, 5k, 10k, 15k and 20k, the distance between
            each consecutive tick is identical. Every interval
            represents an increase of <strong>5,000 in GDP per capita</strong>.
          </p>

          <h3>What are the limitations?</h3>

          <p>
            When data spans a wide range of values, <strong>smaller
              differences can become difficult to distinguish</strong>.
            This is particularly noticeable when a small number
            of countries have exceptionally high GDP per capita.
          </p>

          <div className="analysis-conclusion">
            <p className="eyebrow">KEY TAKEAWAY</p>

            <p>
              A linear scale preserves absolute numerical
              differences, but may hide patterns when data
              spans a very wide range of values.
            </p>
          </div>

        </article>
      </section>

      {/* VISUALIZATION 02 — LOGARITHMIC SCALE */}

      <section className="visualization-section">

        <div className="part-label">
          <span>02.2</span>

          <div>
            <p className="eyebrow">
              SCALE TRANSFORMATION · SECOND APPROACH
            </p>

            <h2>Logarithmic scale</h2>

            <p>
              Revealing relative differences across a wider
              range of values.
            </p>
          </div>
        </div>

        <div className="chart-panel">
          <GapminderLog data={data} />
        </div>

        <article className="analysis">

          <div className="analysis-header">
            <p className="eyebrow">ANALYSIS & INTERPRETATION</p>
            <h3>Understanding the logarithmic scale</h3>
          </div>

          <h3>How does a logarithmic scale work?</h3>

          <p>
            The visualization uses D3's
            <code> scaleLog() </code>
            to represent GDP per capita along the horizontal axis.
          </p>

          <p>
            Unlike a linear scale, a logarithmic scale preserves
            <strong>proportional differences rather than absolute
              differences</strong>. Equal distances correspond to equal
            multiplication factors.
          </p>

          <p>
            For example, the distance between 1,000 and 10,000
            is the same as the distance between 10,000 and 100,000.
          </p>

          <h3>Why is a logarithmic scale useful here?</h3>

          <p>
            GDP per capita varies considerably across countries.
            This large disparity makes a linear representation
            difficult to read.
          </p>

          <p>
            With a logarithmic scale, countries with lower
            and intermediate GDP values are <strong>spread out along
              the horizontal axis</strong>, while higher values are
            progressively compressed.
          </p>

          <p>
            This makes <strong>relative differences easier to compare</strong>.
            For example, the difference between countries
            earning $1,000 and $2,000 per capita is represented
            by the same horizontal distance as the difference
            between countries earning $10,000 and $20,000.
          </p>

          <h3>Understanding the distribution of the ticks</h3>

          <p>
            Ticks on a logarithmic scale are not distributed at regular
            numerical intervals. Their positions follow logarithmic
            values, meaning that <strong>equal distances correspond to
              equal multiplication factors</strong>.
          </p>

          <p>
            For example, the distance between 1k and 10k
            is the same as the distance between 10k and 100k.
            In both cases, the value increases by a factor of ten.
          </p>

          <h3>What are the limitations?</h3>

          <p>
            A logarithmic scale changes how distances must
            be interpreted. Equal horizontal distances
            represent <strong>equal proportional differences</strong>,
            not equal absolute differences.
          </p>

          <p>
            It also <strong>cannot represent zero or negative values</strong>,
            since logarithms are only defined for positive
            numbers. Such values must be handled separately.
          </p>

          <div className="analysis-conclusion">
            <p className="eyebrow">KEY TAKEAWAY</p>

            <p>
              A logarithmic scale is particularly effective
              when numerical values span several orders
              of magnitude. It reveals patterns that may
              be difficult to observe using a linear scale,
              but changes the meaning of visual distance.
            </p>
          </div>

        </article>
      </section>

      {/* VISUALIZATION 03 — SQUARE ROOT SCALE */}

      <section className="visualization-section">

        <div className="part-label">
          <span>02.3</span>

          <div>
            <p className="eyebrow">
              SCALE TRANSFORMATION · THIRD APPROACH
            </p>

            <h2>Square root scale</h2>

            <p>
              Balancing the representation of smaller and
              larger economic values.
            </p>
          </div>
        </div>

        <div className="chart-panel">
          <GapminderSqrt data={data} />
        </div>

        <article className="analysis">

          <div className="analysis-header">
            <p className="eyebrow">ANALYSIS & INTERPRETATION</p>
            <h3>Understanding the square root scale</h3>
          </div>

          <h3>How does a square root scale work?</h3>

          <p>
            The visualization uses D3's
            <code> scaleSqrt() </code>
            to represent GDP per capita along the horizontal axis.
          </p>

          <p>
            A square root scale transforms numerical values
            using the square root function. Instead of preserving
            equal absolute differences like a linear scale,
            it <strong>progressively compresses larger values</strong>.
          </p>

          <p>
            The transformation follows the formula
            <code> f(x) = √x </code>.
            This means that a value of 100 becomes 10,
            while a value of 10,000 becomes 100.
          </p>

          <h3>Why is a square root scale useful here?</h3>

          <p>
            GDP per capita varies significantly between
            countries. A square root scale <strong>reduces the
              dominance of countries with very high GDP values</strong>
            without compressing the distribution as strongly
            as a logarithmic scale.
          </p>

          <p>
            As a result, lower and intermediate GDP values
            gain more visual space compared with a linear
            representation, while the differences between
            larger values remain visible.
          </p>

          <p>
            Another important advantage is that <strong>square root
              scaling can represent zero</strong>. Unlike logarithmic
            scaling, it does not require all values to be
            strictly positive.
          </p>

          <h3>Understanding the distribution of the ticks</h3>

          <p>
            On a square root scale, ticks are positioned
            according to the square root of their numerical
            values. Unlike a linear scale, equal numerical
            intervals do not correspond to equal visual
            distances.
          </p>

          <p>
            For example, the interval between 0 and 1k
            occupies more space than the interval between
            1k and 2k, even though both represent an increase
            of 1,000.
          </p>

          <h3>What are the limitations?</h3>

          <p>
            A square root scale does not preserve equal
            absolute differences or equal proportional
            differences. <strong>Visual distances therefore need
              to be interpreted differently</strong> from both linear
            and logarithmic representations.
          </p>

          <p>
            Although it compresses larger values, the
            transformation may not be sufficient when
            datasets span several orders of magnitude.
            In those situations, a logarithmic scale may
            reveal the distribution more effectively.
          </p>

          <div className="analysis-conclusion">
            <p className="eyebrow">KEY TAKEAWAY</p>

            <p>
              A square root scale provides an intermediate
              transformation between linear and logarithmic
              scaling. It reduces the influence of extreme
              values while retaining a more moderate
              compression of the overall distribution.
            </p>
          </div>

        </article>
      </section>

      {/* TRANSITION — BEYOND SCALING */}

      <section className="alternative-introduction">

        <div className="part-label">
          <span>03</span>
          <p className="eyebrow">BEYOND SCALE TRANSFORMATIONS</p>
        </div>

        <h2>What if we approached the data differently?</h2>

        <p>
          Choosing an appropriate scale can significantly
          improve how we represent numerical data. However,
          <strong>scaling is not the only way to explore a dataset</strong>.
        </p>

        <p>
          Instead of comparing countries along numerical axes,
          we can investigate <strong>similarities between them using
            multiple indicators simultaneously</strong>.
        </p>

        <p>
          As a complementary exploration, the following section
          introduces <strong>hierarchical clustering</strong>. Rather than
          transforming numerical scales, this method offers
          another perspective by identifying groups of countries
          with similar economic, demographic, and health
          characteristics.
        </p>

      </section>

      {/* EXTRA EXPLORATION — HIERARCHICAL CLUSTERING */}

      <section className="visualization-section clustering-section">

        <div className="part-label">
          <span>03.1</span>

          <div>
            <p className="eyebrow">
              COMPLEMENTARY EXPLORATION · FIRST APPROACH
            </p>

            <h2>Hierarchical clustering</h2>

            <p>
              Identifying similarities and patterns between countries.
            </p>
          </div>
        </div>

        <div className="chart-heading">

          <h3>Country similarity tree</h3>

          <p className="chart-subtitle">
            Radial hierarchical clustering · Ward linkage ·
            {data.length} countries · 6 clusters
          </p>

          <p className="chart-subtitle">
            Hover over a country point to explore its information.
          </p>

        </div>

        <div className="chart-panel">
          <Dendrogram data={data} />
        </div>

        <article className="analysis">

          <div className="analysis-header">
            <p className="eyebrow">ANALYSIS & INTERPRETATION</p>
            <h3>Exploring similarities between countries</h3>
          </div>

          <h3>How does hierarchical clustering work?</h3>

          <p>
            The visualization uses hierarchical agglomerative
            clustering to identify groups of countries that share
            similar characteristics across three indicators:
            <strong> life expectancy, GDP per capita, and population.</strong>
          </p>

          <p>
            The algorithm initially treats every country as an
            individual cluster. It then progressively merges the
            most similar countries or groups of countries until
            all observations form a single hierarchical structure.
          </p>

          <p>
            Before clustering, the three variables are <strong>standardized</strong>
            to ensure that they contribute comparably to the distance
            calculations. GDP per capita and population are also
            <strong>log-transformed</strong> to reduce the influence of their highly
            skewed distributions.
          </p>

          <h3>Why is hierarchical clustering useful here?</h3>

          <p>
            Comparing countries using only one indicator can provide
            an incomplete picture. Two countries might have similar
            GDP per capita but very different life expectancies
            or population sizes.
          </p>

          <p>
            By combining several indicators, clustering provides
            a <strong>broader perspective on similarities between countries</strong>.
            It helps reveal groups that share comparable economic,
            demographic, and health characteristics.
          </p>

          <p>
            This study uses <strong>Ward's linkage method</strong>, which merges
            clusters while minimizing the increase in within-cluster
            variation. This generally produces groups with relatively
            homogeneous characteristics.
          </p>

          <h3>Understanding the dendrogram</h3>

          <p>
            Unlike the previous charts, the dendrogram does not
            use conventional numerical axes. Instead, it represents
            the hierarchical relationships between countries
            through a branching structure.
          </p>

          <p>
            Each endpoint represents an individual country.
            Branches illustrate how countries and groups are
            progressively connected. <strong>Countries joined through
              relatively short branches are more similar</strong> according
            to the clustering method.
          </p>

          <p>
            The hierarchy can be divided at different levels to
            obtain a chosen number of clusters. In this visualization,
            <strong>six clusters</strong> are used to provide a balance between
            detail and interpretability. Each group receives a
            distinct colour, and the cards below summarize its
            average life expectancy, GDP per capita, and population.
          </p>

          <h3>What are the limitations?</h3>

          <p>
            Clustering identifies statistical similarities,
            but it <strong>does not establish causal relationships</strong> or
            explain why countries share certain characteristics.
            Its results depend on the variables, transformations,
            distance measure, and linkage method selected.
          </p>

          <p>
            The choice of six clusters is also an analytical
            decision rather than an objectively correct number.
            Different choices could reveal other groupings.
          </p>

          <div className="analysis-conclusion">
            <p className="eyebrow">KEY TAKEAWAY</p>

            <p>
              Hierarchical clustering reveals broader patterns
              of similarity between countries by combining
              economic, demographic, and health indicators.
              Rather than simply changing how data is displayed,
              it provides another way to explore and interpret
              the underlying structure of the dataset.
            </p>
          </div>

        </article>
      </section>

      {/* FINAL CONCLUSION */}

      <section className="final-conclusion">

        <div className="part-label">
          <span>04</span>
          <p className="eyebrow">CONCLUSION</p>
        </div>

        <h2>The importance of choosing the right representation.</h2>

        <p>
          This study demonstrates that <strong>the choice of scale
            fundamentally influences how numerical data is
            represented and interpreted.</strong>
        </p>

        <p>
          Linear, logarithmic and square root scales each
          offer different perspectives on the same dataset.
          Understanding their properties helps us select
          the most appropriate representation for the patterns
          we want to explore.
        </p>

        <p>
          Ultimately, effective data visualization is not
          simply about displaying information accurately.
          It is also about <strong>making meaningful relationships
            visible without distorting their interpretation.</strong>
        </p>

      </section>

      {/* FOOTER */}

      <footer className="page-footer">

        <span>
          Fabien Haury 2026 for{" "}
          <a
            href="https://www.react-graph-gallery.com/react-d3-dataviz-course"
            target="_blank"
            rel="noopener noreferrer"
          >
            react-d3-dataviz-course
          </a>
        </span>

      </footer>

    </main>
  );
}

export default App;
