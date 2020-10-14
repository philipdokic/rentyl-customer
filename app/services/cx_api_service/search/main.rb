# frozen_string_literal: true

module CxApiService
  module Search
    # search methods to be used by other search classes
    class Main
      def initialize(params)
        @params = params
      end

      def order_and_paginate(search_results)
        paginate(order(search_results))
      end

      def order(search_results)
        search_results.order(sort_string)
      end

      def paginate(search_results)
        search_results.page(page).per(limit)
      end

      private

      def sort_string
        # Meant to be overwritten in inherited classes
        # leaving here to have a default
        nil
      end

      def limit
        @limit ||= (@params[:limit].to_i || 18)
      end

      def page
        @page ||= (@params[:page].to_i || 1)
      end
    end
  end
end
