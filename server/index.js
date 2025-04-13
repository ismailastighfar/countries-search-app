import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, NavLink, Meta, Links, ScrollRestoration, Scripts, HashRouter, Outlet, isRouteErrorResponse, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
function Navbar() {
  return /* @__PURE__ */ jsx("header", { className: "w-full px-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white", children: /* @__PURE__ */ jsx("div", { className: "container flex flex-col md:flex-row items-center justify-between py-4 mx-auto max-w-7xl", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-center space-y-4 md:space-y-0", children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/",
        className: "flex items-center transform hover:scale-105 transition-transform duration-200",
        children: /* @__PURE__ */ jsxs("span", { className: "text-2xl font-black select-none", children: [
          "Countries",
          /* @__PURE__ */ jsx("span", { className: "text-purple-300", children: "Explorer" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxs("nav", { className: "flex flex-wrap items-center md:ml-12 space-x-8", children: [
      /* @__PURE__ */ jsx(
        NavLink,
        {
          to: "/",
          end: true,
          className: ({ isActive }) => `relative font-medium hover:text-purple-300 transition-colors duration-200 py-2 ${isActive ? 'text-purple-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-300' : "text-white"}`,
          children: "Home"
        }
      ),
      /* @__PURE__ */ jsx(
        NavLink,
        {
          to: "/countries",
          className: ({ isActive }) => `relative font-medium hover:text-purple-300 transition-colors duration-200 py-2 ${isActive ? 'text-purple-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-300' : "text-white"}`,
          children: "Countries"
        }
      ),
      /* @__PURE__ */ jsx(
        NavLink,
        {
          to: "/about",
          className: ({ isActive }) => `relative font-medium hover:text-purple-300 transition-colors duration-200 py-2 ${isActive ? 'text-purple-300 after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-purple-300' : "text-white"}`,
          children: "About"
        }
      )
    ] })
  ] }) }) });
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(HashRouter, {
    basename: "/countries-search-app",
    children: /* @__PURE__ */ jsxs("div", {
      children: [/* @__PURE__ */ jsx(Navbar, {}), /* @__PURE__ */ jsx(Outlet, {})]
    })
  });
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Countries Search App"
  }, {
    name: "Countries Search",
    content: "Welcome to Countries Search App!"
  }];
}
const home = withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("div", {
    className: "px-2 py-32 bg-white md:px-0",
    children: /* @__PURE__ */ jsx("div", {
      className: "container items-center max-w-6xl mx-auto xl:px-5",
      children: /* @__PURE__ */ jsxs("div", {
        className: "flex flex-wrap items-center sm:-mx-3",
        children: [/* @__PURE__ */ jsx("div", {
          className: "w-full md:w-1/2 md:px-3",
          children: /* @__PURE__ */ jsxs("div", {
            className: "space-y-6 sm:max-w-md lg:max-w-lg",
            children: [/* @__PURE__ */ jsxs("h1", {
              className: "text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl",
              children: [/* @__PURE__ */ jsx("span", {
                className: "block xl:inline",
                children: "Explore Countries with "
              }), /* @__PURE__ */ jsx("span", {
                className: "block text-indigo-600 xl:inline",
                children: "Real-Time Data"
              })]
            }), /* @__PURE__ */ jsx("p", {
              className: "mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl",
              children: "Discover details about every country around the world – from capitals to regions!"
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex flex-col sm:flex-row sm:space-x-4",
              children: [/* @__PURE__ */ jsxs(Link, {
                to: "/countries",
                className: "flex items-center justify-center px-6 py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700",
                children: ["Explore Now", /* @__PURE__ */ jsxs("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "w-5 h-5 ml-1",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: [/* @__PURE__ */ jsx("line", {
                    x1: "5",
                    y1: "12",
                    x2: "19",
                    y2: "12"
                  }), /* @__PURE__ */ jsx("polyline", {
                    points: "12 5 19 12 12 19"
                  })]
                })]
              }), /* @__PURE__ */ jsx(Link, {
                to: "/about",
                className: "flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600",
                children: "Learn More"
              })]
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "w-full md:w-1/2",
          children: /* @__PURE__ */ jsx("div", {
            className: "overflow-hidden rounded-md shadow-xl",
            children: /* @__PURE__ */ jsx("img", {
              src: "https://image.winudf.com/v2/image/Ymx1ZWNhcC5pbWFnZXouYmVhdXRpZnVsX2NvdW50cmllc193YWxscGFwZXJzX3NjcmVlbl8wXzlpMW14OWl1/screen-0.webp?fakeurl=1&type=.webp",
              alt: "Explore countries",
              className: "w-full h-auto"
            })
          })
        })]
      })
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const about = withComponentProps(function About() {
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8",
    children: /* @__PURE__ */ jsxs("div", {
      className: "max-w-7xl mx-auto",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "text-center",
        children: [/* @__PURE__ */ jsxs("h1", {
          className: "text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl",
          children: ["Explore Countries", /* @__PURE__ */ jsx("span", {
            className: "block text-indigo-600",
            children: "Your Global Guide"
          })]
        }), /* @__PURE__ */ jsx("p", {
          className: "mt-6 text-xl text-gray-500 max-w-2xl mx-auto",
          children: "Discover detailed information about countries around the world, from population statistics to cultural insights."
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3",
        children: [/* @__PURE__ */ jsx("div", {
          className: "group relative rounded-lg p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300",
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("div", {
              className: "inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-medium text-gray-900",
              children: "Global Coverage"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-base text-gray-500",
              children: "Comprehensive information about countries from all continents and regions."
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "group relative rounded-lg p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300",
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("div", {
              className: "inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-medium text-gray-900",
              children: "Advanced Filters"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-base text-gray-500",
              children: "Easy-to-use search and filter options to find exactly what you're looking for."
            })]
          })
        }), /* @__PURE__ */ jsx("div", {
          className: "group relative rounded-lg p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300",
          children: /* @__PURE__ */ jsxs("div", {
            className: "text-center",
            children: [/* @__PURE__ */ jsx("div", {
              className: "inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600 mb-4",
              children: /* @__PURE__ */ jsx("svg", {
                className: "h-6 w-6",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx("path", {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                })
              })
            }), /* @__PURE__ */ jsx("h3", {
              className: "text-lg font-medium text-gray-900",
              children: "Detailed Info"
            }), /* @__PURE__ */ jsx("p", {
              className: "mt-4 text-base text-gray-500",
              children: "Access to demographics, geography, languages, and cultural information."
            })]
          })
        })]
      })]
    })
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: about
}, Symbol.toStringTag, { value: "Module" }));
async function clientLoader$1() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();
  return data;
}
const countries = withComponentProps(function Countries({
  loaderData
}) {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const filteredCountries = loaderData.filter((country2) => {
    const matchesRegion = !region || country2.region.toLowerCase() === region.toLowerCase();
    const matchesSearch = !search || country2.name.common.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && matchesRegion;
  });
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8",
    children: [/* @__PURE__ */ jsx("h2", {
      className: "text-4xl font-extrabold bg-clip-text bg-gradient-to-r text-indigo-600 mb-8",
      children: "Explore Countries"
    }), /* @__PURE__ */ jsxs("div", {
      className: "flex flex-col sm:flex-row gap-6 mb-8",
      children: [/* @__PURE__ */ jsxs("div", {
        className: "relative w-full sm:w-1/2",
        children: [/* @__PURE__ */ jsx("input", {
          type: "text",
          placeholder: "Search by name...",
          value: search,
          onChange: (e) => setSearch(e.target.value),
          className: "w-full px-4 py-3 rounded-lg bg-white shadow-sm border-0 focus:ring-2 focus:ring-indigo-500 transition-all"
        }), /* @__PURE__ */ jsx("svg", {
          className: "w-5 h-5 absolute right-3 top-3.5 text-gray-400",
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsx("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          })
        })]
      }), /* @__PURE__ */ jsxs("select", {
        value: region,
        onChange: (e) => setRegion(e.target.value),
        className: "w-full sm:w-1/2 px-4 py-3 rounded-lg bg-white shadow-sm border-0 focus:ring-2 focus:ring-indigo-500 transition-all",
        children: [/* @__PURE__ */ jsx("option", {
          value: "",
          children: "All Regions"
        }), /* @__PURE__ */ jsx("option", {
          value: "africa",
          children: "Africa"
        }), /* @__PURE__ */ jsx("option", {
          value: "americas",
          children: "Americas"
        }), /* @__PURE__ */ jsx("option", {
          value: "asia",
          children: "Asia"
        }), /* @__PURE__ */ jsx("option", {
          value: "europe",
          children: "Europe"
        }), /* @__PURE__ */ jsx("option", {
          value: "oceania",
          children: "Oceania"
        })]
      })]
    }), filteredCountries.length === 0 ? /* @__PURE__ */ jsx("div", {
      className: "text-center py-12 text-gray-500",
      children: "No countries match your filters."
    }) : /* @__PURE__ */ jsx("ul", {
      className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
      children: filteredCountries.map((country2) => /* @__PURE__ */ jsxs("li", {
        className: "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300",
        children: [/* @__PURE__ */ jsx("div", {
          className: "aspect-w-16 aspect-h-9 bg-gray-100",
          children: /* @__PURE__ */ jsx("img", {
            src: country2.flags.svg,
            alt: `Flag of ${country2.name.common}`,
            className: "w-full h-full object-cover"
          })
        }), /* @__PURE__ */ jsxs("div", {
          className: "p-5",
          children: [/* @__PURE__ */ jsx(Link, {
            to: `/countries/${country2.name.common}`,
            className: "text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors",
            children: country2.name.common
          }), /* @__PURE__ */ jsxs("div", {
            className: "mt-3 space-y-1 text-gray-600",
            children: [/* @__PURE__ */ jsxs("div", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-medium",
                children: "Region:"
              }), /* @__PURE__ */ jsx("span", {
                className: "ml-2",
                children: country2.region
              })]
            }), /* @__PURE__ */ jsxs("div", {
              className: "flex items-center",
              children: [/* @__PURE__ */ jsx("span", {
                className: "font-medium",
                children: "Population:"
              }), /* @__PURE__ */ jsx("span", {
                className: "ml-2",
                children: country2.population.toLocaleString()
              })]
            })]
          })]
        })]
      }, country2.cca3))
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader: clientLoader$1,
  default: countries
}, Symbol.toStringTag, { value: "Module" }));
async function clientLoader({
  params
}) {
  const countryName = params.countryName;
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
  const data = await res.json();
  return data;
}
const country = withComponentProps(function Country({
  loaderData
}) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const country2 = {
    name: ((_b = (_a = loaderData[0]) == null ? void 0 : _a.name) == null ? void 0 : _b.common) || "N/A",
    officialName: ((_d = (_c = loaderData[0]) == null ? void 0 : _c.name) == null ? void 0 : _d.official) || "N/A",
    region: ((_e = loaderData[0]) == null ? void 0 : _e.region) || "N/A",
    subregion: ((_f = loaderData[0]) == null ? void 0 : _f.subregion) || "N/A",
    capital: ((_g = loaderData[0]) == null ? void 0 : _g.capital) || "N/A",
    population: ((_h = loaderData[0]) == null ? void 0 : _h.population) || "N/A",
    flagUrl: ((_j = (_i = loaderData[0]) == null ? void 0 : _i.flags) == null ? void 0 : _j.png) || ""
  };
  return /* @__PURE__ */ jsx("div", {
    className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8",
    children: /* @__PURE__ */ jsx("div", {
      className: "max-w-6xl mx-auto",
      children: /* @__PURE__ */ jsx("div", {
        className: "bg-white rounded-2xl shadow-xl overflow-hidden",
        children: /* @__PURE__ */ jsxs("div", {
          className: "flex flex-col lg:flex-row",
          children: [country2.flagUrl && /* @__PURE__ */ jsxs("div", {
            className: "lg:w-1/2 relative",
            children: [/* @__PURE__ */ jsx("div", {
              className: "absolute inset-0 bg-black opacity-10"
            }), /* @__PURE__ */ jsx("img", {
              src: country2.flagUrl,
              className: "w-full h-full object-cover",
              alt: `Flag of ${country2.name}`
            })]
          }), /* @__PURE__ */ jsxs("div", {
            className: "lg:w-1/2 p-8",
            children: [/* @__PURE__ */ jsx("h1", {
              className: "text-4xl font-bold text-gray-800 mb-6",
              children: country2.name
            }), /* @__PURE__ */ jsxs("div", {
              className: "space-y-4",
              children: [/* @__PURE__ */ jsx(InfoItem, {
                label: "Official Name",
                value: country2.officialName
              }), /* @__PURE__ */ jsx(InfoItem, {
                label: "Capital",
                value: country2.capital
              }), /* @__PURE__ */ jsx(InfoItem, {
                label: "Region",
                value: country2.region
              }), /* @__PURE__ */ jsx(InfoItem, {
                label: "Subregion",
                value: country2.subregion
              }), /* @__PURE__ */ jsx(InfoItem, {
                label: "Population",
                value: country2.population.toLocaleString()
              })]
            })]
          })]
        })
      })
    })
  });
});
function InfoItem({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", {
    className: "group hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200",
    children: [/* @__PURE__ */ jsx("div", {
      className: "text-sm text-gray-500 uppercase tracking-wider",
      children: label
    }), /* @__PURE__ */ jsx("div", {
      className: "text-lg text-gray-800 font-medium group-hover:text-blue-600 transition-colors duration-200",
      children: value
    })]
  });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clientLoader,
  default: country
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/countries-search-appassets/entry.client-BSqK_Rot.js", "imports": ["/countries-search-appassets/chunk-KNED5TY2-DQOSKn4l.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/countries-search-appassets/root-DDsarXY2.js", "imports": ["/countries-search-appassets/chunk-KNED5TY2-DQOSKn4l.js", "/countries-search-appassets/with-props-CArjYSqZ.js"], "css": ["/countries-search-appassets/root-C5JDHO4c.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/countries-search-appassets/home-CLYtYjy4.js", "imports": ["/countries-search-appassets/with-props-CArjYSqZ.js", "/countries-search-appassets/chunk-KNED5TY2-DQOSKn4l.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/about": { "id": "routes/about", "parentId": "root", "path": "about", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/countries-search-appassets/about-DdB2jGml.js", "imports": ["/countries-search-appassets/with-props-CArjYSqZ.js", "/countries-search-appassets/chunk-KNED5TY2-DQOSKn4l.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/countries": { "id": "routes/countries", "parentId": "root", "path": "countries", "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/countries-search-appassets/countries-DdoEDK3g.js", "imports": ["/countries-search-appassets/with-props-CArjYSqZ.js", "/countries-search-appassets/chunk-KNED5TY2-DQOSKn4l.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/country": { "id": "routes/country", "parentId": "root", "path": "countries/:countryName", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": true, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/countries-search-appassets/country-BvCOoaE_.js", "imports": ["/countries-search-appassets/with-props-CArjYSqZ.js", "/countries-search-appassets/chunk-KNED5TY2-DQOSKn4l.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/countries-search-appassets/manifest-a97658e7.js", "version": "a97658e7", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/countries-search-app";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/countries": {
    id: "routes/countries",
    parentId: "root",
    path: "countries",
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/country": {
    id: "routes/country",
    parentId: "root",
    path: "countries/:countryName",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
